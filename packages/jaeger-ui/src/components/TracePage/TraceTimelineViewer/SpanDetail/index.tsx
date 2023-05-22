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

import React from 'react';
import { Divider, Tooltip } from 'antd';
import { Link as RouterLink } from 'react-router-dom';

import AccordianKeyValues from './AccordianKeyValues';
import AccordianLogs from './AccordianLogs';
import AccordianReferences from './AccordianReferences';
import AccordianText from './AccordianText';
import DetailState from './DetailState';
import { formatDuration } from '../utils';
import CopyIcon from '../../../common/CopyIcon';
import LabeledList from '../../../common/LabeledList';
import { actions } from '../../../../api/digma/actions';
import { dispatcher } from '../../../../api/digma/dispatcher';
import { state as globalState } from '../../../../api/digma/state';
import { ISpanInsight, SetSpansDataPayload } from '../../../../api/digma/types';
import { getInsightTypeInfo } from '../../../common/InsightIcon/utils';
import { InsightIcon } from '../../../common/InsightIcon';

import { TNil } from '../../../../types';
import { KeyValuePair, Link, Log, Span } from '../../../../types/trace';

import './index.css';

type SpanDetailProps = {
  detailState: DetailState;
  linksGetter: ((links: KeyValuePair[], index: number) => Link[]) | TNil;
  logItemToggle: (spanID: string, log: Log) => void;
  logsToggle: (spanID: string) => void;
  processToggle: (spanID: string) => void;
  span: Span;
  tagsToggle: (spanID: string) => void;
  traceStartTime: number;
  warningsToggle: (spanID: string) => void;
  referencesToggle: (spanID: string) => void;
  focusSpan: (uiFind: string) => void;
};

type SpanDetailState = {
  insights: ISpanInsight[];
};

export default class SpanDetail extends React.Component<SpanDetailProps, SpanDetailState> {
  constructor(props: SpanDetailProps) {
    super(props);
    const span = globalState.spans[props.span.spanID];
    this.state = {
      insights: span ? span.insights : [],
    };
  }

  componentDidMount(): void {
    dispatcher.addActionListener(actions.SET_SPANS_DATA, this.updateSpanInfo);
  }

  componentWillUnmount(): void {
    dispatcher.removeActionListener(actions.SET_SPANS_DATA, this.updateSpanInfo);
    dispatcher.dispatch(actions.CLEAR);
  }

  updateSpanInfo = (data: unknown) => {
    const span = (data as SetSpansDataPayload)[this.props.span.spanID];
    this.setState({
      insights: span ? span.insights : [],
    });
  };

  handleGoToCodeLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const otelLibraryNameTag = this.props.span.tags.find((tag: any) => tag.key === 'otel.library.name');
    const functionTag = this.props.span.tags.find((tag: any) => tag.key === 'code.function');
    const namespaceTag = this.props.span.tags.find((tag: any) => tag.key === 'code.namespace');

    if (otelLibraryNameTag) {
      window.sendMessageToDigma({
        action: actions.GO_TO_SPAN,
        payload: {
          id: this.props.span.spanID,
          name: this.props.span.operationName,
          instrumentationLibrary: otelLibraryNameTag.value,
          ...(functionTag ? { function: functionTag.value } : {}),
          ...(namespaceTag ? { namespace: namespaceTag.value } : {}),
        },
      });
    }
  };

  render() {
    const {
      detailState,
      linksGetter,
      logItemToggle,
      logsToggle,
      processToggle,
      span,
      tagsToggle,
      traceStartTime,
      warningsToggle,
      referencesToggle,
      focusSpan,
    } = this.props;
    const { isTagsOpen, isProcessOpen, logs: logsState, isWarningsOpen, isReferencesOpen } = detailState;
    const { operationName, process, duration, relativeStartTime, spanID, logs, tags, warnings, references } =
      span;
    const overviewItems = [
      {
        key: 'svc',
        label: 'Service:',
        value: process.serviceName,
      },
      {
        key: 'duration',
        label: 'Duration:',
        value: formatDuration(duration),
      },
      {
        key: 'start',
        label: 'Start Time:',
        value: formatDuration(relativeStartTime),
      },
    ];
    const deepLinkCopyText = `${window.location.origin}${window.location.pathname}?uiFind=${spanID}`;
    const otelLibraryNameTag = this.props.span.tags.find((tag: any) => tag.key === 'otel.library.name');

    return (
      <div>
        <div className="SpanDetail--header">
          <div className="ub-flex ub-items-center">
            {otelLibraryNameTag && this.state.insights.length > 0 ? (
              <RouterLink
                to="#"
                onClick={this.handleGoToCodeLinkClick}
                className="SpanDetail--operationNameLink ub-flex-auto ub-m0"
              >
                {operationName}
              </RouterLink>
            ) : (
              <h2 className="SpanDetail--operationNameTitle ub-flex-auto ub-m0">{operationName}</h2>
            )}
            <div className="SpanDetail--insights">
              {this.state.insights.map(insight => {
                const insightTypeInfo = getInsightTypeInfo(insight.type);

                return insightTypeInfo ? (
                  <Tooltip key={insight.type} title={insightTypeInfo.label}>
                    <span className="SpanDetail--insightIconContainer">
                      <InsightIcon insight={insight} size={20} />
                    </span>
                  </Tooltip>
                ) : null;
              })}
            </div>
          </div>
          <LabeledList dividerClassName="SpanDetail--divider" items={overviewItems} />
        </div>
        <Divider className="SpanDetail--divider ub-my1" />
        <div>
          <div>
            <AccordianKeyValues
              data={tags}
              label="Tags"
              linksGetter={linksGetter}
              isOpen={isTagsOpen}
              onToggle={() => tagsToggle(spanID)}
            />
            {process.tags && (
              <AccordianKeyValues
                className="ub-mb1"
                data={process.tags}
                label="Process"
                linksGetter={linksGetter}
                isOpen={isProcessOpen}
                onToggle={() => processToggle(spanID)}
              />
            )}
          </div>
          {logs && logs.length > 0 && (
            <AccordianLogs
              linksGetter={linksGetter}
              logs={logs}
              isOpen={logsState.isOpen}
              openedItems={logsState.openedItems}
              onToggle={() => logsToggle(spanID)}
              onItemToggle={logItem => logItemToggle(spanID, logItem)}
              timestamp={traceStartTime}
            />
          )}
          {warnings && warnings.length > 0 && (
            <AccordianText
              className="AccordianWarnings"
              headerClassName="AccordianWarnings--header"
              label={<span className="AccordianWarnings--label">Warnings</span>}
              data={warnings}
              isOpen={isWarningsOpen}
              onToggle={() => warningsToggle(spanID)}
            />
          )}
          {references &&
            references.length > 0 &&
            (references.length > 1 || references[0].refType !== 'CHILD_OF') && (
              <AccordianReferences
                data={references}
                isOpen={isReferencesOpen}
                onToggle={() => referencesToggle(spanID)}
                focusSpan={focusSpan}
              />
            )}
          <small className="SpanDetail--debugInfo">
            <span className="SpanDetail--debugLabel" data-label="SpanID:" /> {spanID}
            <CopyIcon
              copyText={deepLinkCopyText}
              icon="link"
              placement="topRight"
              tooltipTitle="Copy deep link to this span"
            />
          </small>
        </div>
      </div>
    );
  }
}
