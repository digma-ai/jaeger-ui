// Copyright (c) 2017 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as React from 'react';
import { Button, Input } from 'antd';
import _get from 'lodash/get';
import _maxBy from 'lodash/maxBy';
import _values from 'lodash/values';
import IoAndroidArrowBack from 'react-icons/lib/io/android-arrow-back';
import IoIosFilingOutline from 'react-icons/lib/io/ios-filing-outline';
import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right';
import { Link } from 'react-router-dom';

import AltViewOptions from './AltViewOptions';
import KeyboardShortcutsHelp from './KeyboardShortcutsHelp';
import SpanGraph from './SpanGraph';
import TracePageSearchBar from './TracePageSearchBar';
import { TUpdateViewRangeTimeFunction, IViewRange, ViewRangeTimeUpdate, ETraceViewType } from '../types';
import LabeledList from '../../common/LabeledList';
import NewWindowIcon from '../../common/NewWindowIcon';
import TraceName from '../../common/TraceName';
import { getTraceName } from '../../../model/trace-viewer';
import { TNil } from '../../../types';
import { Trace } from '../../../types/trace';
import { formatDatetime, formatDuration } from '../../../utils/date';
import { getTraceLinks } from '../../../model/link-patterns';

import './TracePageHeader.css';
import ExternalLinks from '../../common/ExternalLinks';
import ZoomControls from './ZoomControls';
import { globalActions } from '../../../api/digma/actions';
import { OpenURLInDefaultBrowserPayload } from '../../../api/digma/types';
import isString from '../../../utils/ts/typeGuards/isString';
import prefixUrl from '../../../utils/prefix-url';

type TracePageHeaderEmbedProps = {
  canCollapse: boolean;
  clearSearch: () => void;
  focusUiFindMatches: () => void;
  hideMap: boolean;
  hideSummary: boolean;
  linkToStandalone: string;
  nextResult: () => void;
  onArchiveClicked: () => void;
  onSlimViewClicked: () => void;
  onTraceViewChange: (viewType: ETraceViewType) => void;
  prevResult: () => void;
  resultCount: number;
  showArchiveButton: boolean;
  showShortcutsHelp: boolean;
  showStandaloneLink: boolean;
  showViewOptions: boolean;
  slimView: boolean;
  textFilter: string | TNil;
  toSearch: string | null;
  trace: Trace;
  viewType: ETraceViewType;
  updateNextViewRangeTime: (update: ViewRangeTimeUpdate) => void;
  updateViewRangeTime: TUpdateViewRangeTimeFunction;
  viewRange: IViewRange;
};

export const HEADER_ITEMS = [
  {
    key: 'timestamp',
    label: 'Trace Start',
    renderer: (trace: Trace) => {
      const dateStr = formatDatetime(trace.startTime);
      const match = dateStr.match(/^(.+)(\.\d+)$/);
      return match ? (
        <span className="TracePageHeader--overviewItem--value">
          {match[1]}
          <span className="TracePageHeader--overviewItem--valueDetail">{match[2]}</span>
        </span>
      ) : (
        dateStr
      );
    },
  },
  {
    key: 'duration',
    label: 'Duration',
    renderer: (trace: Trace) => formatDuration(trace.duration),
  },
  {
    key: 'service-count',
    label: 'Services',
    renderer: (trace: Trace) => new Set(_values(trace.processes).map(p => p.serviceName)).size,
  },
  {
    key: 'depth',
    label: 'Depth',
    renderer: (trace: Trace) => _get(_maxBy(trace.spans, 'depth'), 'depth', 0) + 1,
  },
  {
    key: 'span-count',
    label: 'Total Spans',
    renderer: (trace: Trace) => trace.spans.length,
  },
];

export function TracePageHeaderFn(props: TracePageHeaderEmbedProps & { forwardedRef: React.Ref<Input> }) {
  const {
    canCollapse,
    clearSearch,
    focusUiFindMatches,
    forwardedRef,
    hideMap,
    hideSummary,
    linkToStandalone,
    nextResult,
    onArchiveClicked,
    onSlimViewClicked,
    onTraceViewChange,
    prevResult,
    resultCount,
    showArchiveButton,
    showShortcutsHelp,
    showStandaloneLink,
    showViewOptions,
    slimView,
    textFilter,
    toSearch,
    trace,
    viewType,
    updateNextViewRangeTime,
    updateViewRangeTime,
    viewRange,
  } = props;

  if (!trace) {
    return null;
  }

  const links = getTraceLinks(trace);

  const summaryItems =
    !hideSummary &&
    !slimView &&
    HEADER_ITEMS.map(item => {
      const { renderer, ...rest } = item;
      return { ...rest, value: renderer(trace) };
    });

  const traceName = getTraceName(trace.spans);

  const title = (
    <h1 className={`TracePageHeader--title ${canCollapse ? 'is-collapsible' : ''}`}>
      <TraceName traceName={traceName} breakable={false} />{' '}
      <small className="u-tx-muted">{trace.traceID.slice(0, 7)}</small>
    </h1>
  );

  const handleStandaloneLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const getBaseUrl = (): string => {
      if (isString(window.baseUrl) && window.baseUrl) {
        return window.baseUrl;
      }

      if (isString(window.apiBaseUrl) && window.apiBaseUrl) {
        return window.apiBaseUrl;
      }

      return prefixUrl('/');
    };

    const baseUrl: string = getBaseUrl();

    e.preventDefault();
    window.sendMessageToDigma<OpenURLInDefaultBrowserPayload>({
      action: globalActions.OPEN_URL_IN_DEFAULT_BROWSER,
      payload: {
        url: `${baseUrl}/trace/${trace.traceID}${window.location.search}`,
      },
    });
  };

  return (
    <header className="TracePageHeader">
      <div className="TracePageHeader--titleRow">
        {toSearch && (
          <Link className="TracePageHeader--back" to={toSearch}>
            <IoAndroidArrowBack />
          </Link>
        )}
        {links && links.length > 0 && <ExternalLinks links={links} />}
        {canCollapse ? (
          <a
            className="TracePageHeader--titleLink"
            onClick={onSlimViewClicked}
            role="switch"
            aria-checked={!slimView}
          >
            <MdKeyboardArrowRight
              className={`TracePageHeader--detailToggle ${!slimView ? 'is-expanded' : ''}`}
            />
            {title}
          </a>
        ) : (
          title
        )}
        <TracePageSearchBar
          clearSearch={clearSearch}
          focusUiFindMatches={focusUiFindMatches}
          nextResult={nextResult}
          prevResult={prevResult}
          ref={forwardedRef}
          resultCount={resultCount}
          textFilter={textFilter}
          navigable={viewType === ETraceViewType.TraceTimelineViewer}
        />
        {showShortcutsHelp && <KeyboardShortcutsHelp className="ub-m2" />}
        {showViewOptions && (
          <AltViewOptions onTraceViewChange={onTraceViewChange} traceID={trace.traceID} viewType={viewType} />
        )}
        {showArchiveButton && (
          <Button className="ub-mr2 ub-flex ub-items-center" htmlType="button" onClick={onArchiveClicked}>
            <IoIosFilingOutline className="TracePageHeader--archiveIcon" />
            Archive Trace
          </Button>
        )}
        {window.enableZoomControls && <ZoomControls className="TracePageHeader--zoomControls" />}
        {showStandaloneLink &&
          (window.platform === 'JetBrains' ? (
            <Link className="u-tx-inherit ub-nowrap ub-mx2" to="#" onClick={handleStandaloneLinkClick}>
              <NewWindowIcon isLarge />
            </Link>
          ) : (
            <Link
              className="u-tx-inherit ub-nowrap ub-mx2"
              to={linkToStandalone}
              target="_blank"
              rel="noopener noreferrer"
            >
              <NewWindowIcon isLarge />
            </Link>
          ))}
      </div>
      {summaryItems && <LabeledList className="TracePageHeader--overviewItems" items={summaryItems} />}
      {!hideMap && !slimView && (
        <SpanGraph
          trace={trace}
          viewRange={viewRange}
          updateNextViewRangeTime={updateNextViewRangeTime}
          updateViewRangeTime={updateViewRangeTime}
        />
      )}
    </header>
  );
}

export default React.forwardRef((props: TracePageHeaderEmbedProps, ref: React.Ref<Input>) => (
  <TracePageHeaderFn {...props} forwardedRef={ref} />
));
