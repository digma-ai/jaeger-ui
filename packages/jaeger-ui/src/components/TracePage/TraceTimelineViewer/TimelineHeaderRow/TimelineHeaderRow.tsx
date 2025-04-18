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

import VerticalResizer from '../../../common/VerticalResizer';
import TimelineCollapser from './TimelineCollapser';
import TimelineViewingLayer from './TimelineViewingLayer';
import Ticks from '../Ticks';
import TimelineRow from '../TimelineRow';
import { TUpdateViewRangeTimeFunction, IViewRangeTime, ViewRangeTimeUpdate } from '../../types';

import './TimelineHeaderRow.css';
import LoadingIndicator from '../../../common/LoadingIndicator';
import dispatcher from '../../../../api/digma/dispatcher';
import { actions } from '../../../../api/digma/actions';
import { state as globalState } from '../../../../api/digma/state';

type TimelineHeaderRowProps = {
  duration: number;
  nameColumnWidth: number;
  numTicks: number;
  onCollapseAll: () => void;
  onCollapseOne: () => void;
  onColummWidthChange: (width: number) => void;
  onExpandAll: () => void;
  onExpandOne: () => void;
  updateNextViewRangeTime: (update: ViewRangeTimeUpdate) => void;
  updateViewRangeTime: TUpdateViewRangeTimeFunction;
  viewRangeTime: IViewRangeTime;
};

type TimelineHeaderRowState = {
  isLoading: boolean;
};

export default class SpanDetailRow extends React.PureComponent<
  TimelineHeaderRowProps,
  TimelineHeaderRowState
> {
  constructor(props: TimelineHeaderRowProps) {
    super(props);
    this._updateIsLoading = this._updateIsLoading.bind(this);
    this.state = {
      isLoading: Boolean(globalState.pendingOperationsCount),
    };
  }

  componentDidMount() {
    dispatcher.addActionListener(actions.SET_SPANS_DATA, this._updateIsLoading);
  }

  componentWillUnmount() {
    dispatcher.removeActionListener(actions.SET_SPANS_DATA, this._updateIsLoading);
  }

  _updateIsLoading() {
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const {
      duration,
      nameColumnWidth,
      numTicks,
      onCollapseAll,
      onCollapseOne,
      onColummWidthChange,
      onExpandAll,
      onExpandOne,
      updateViewRangeTime,
      updateNextViewRangeTime,
      viewRangeTime,
    } = this.props;
    const [viewStart, viewEnd] = viewRangeTime.current;

    return (
      <TimelineRow className="TimelineHeaderRow">
        <TimelineRow.Cell className="ub-flex ub-px2" width={nameColumnWidth}>
          <h3 className="TimelineHeaderRow--title">Service &amp; Operation</h3>
          {this.state.isLoading && (
            <div className="ub-flex TimelineHeaderRow--loading">
              <LoadingIndicator className="is-medium" />
              <span className="TimelineHeaderRow--loading-text">Loading data...</span>
            </div>
          )}
          <TimelineCollapser
            onCollapseAll={onCollapseAll}
            onExpandAll={onExpandAll}
            onCollapseOne={onCollapseOne}
            onExpandOne={onExpandOne}
          />
        </TimelineRow.Cell>
        <TimelineRow.Cell width={1 - nameColumnWidth}>
          <TimelineViewingLayer
            boundsInvalidator={nameColumnWidth}
            updateNextViewRangeTime={updateNextViewRangeTime}
            updateViewRangeTime={updateViewRangeTime}
            viewRangeTime={viewRangeTime}
          />
          <Ticks
            numTicks={numTicks}
            startTime={viewStart * duration}
            endTime={viewEnd * duration}
            showLabels
          />
        </TimelineRow.Cell>
        <VerticalResizer position={nameColumnWidth} onChange={onColummWidthChange} min={0.15} max={0.85} />
      </TimelineRow>
    );
  }
}
