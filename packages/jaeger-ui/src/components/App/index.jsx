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

import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import NotFound from './NotFound';
import Page from './Page';
import DependencyGraph from '../DependencyGraph';
import { ROUTE_PATH as dependenciesPath } from '../DependencyGraph/url';
import DeepDependencies from '../DeepDependencies';
import { ROUTE_PATH as deepDependenciesPath } from '../DeepDependencies/url';
import QualityMetrics from '../QualityMetrics';
import { ROUTE_PATH as qualityMetricsPath } from '../QualityMetrics/url';
import SearchTracePage from '../SearchTracePage';
import { ROUTE_PATH as searchPath } from '../SearchTracePage/url';
import TraceDiff from '../TraceDiff';
import { ROUTE_PATH as traceDiffPath } from '../TraceDiff/url';
import TracePage from '../TracePage';
import { ROUTE_PATH as tracePath } from '../TracePage/url';
import MonitorATMPage from '../Monitor';
import { ROUTE_PATH as monitorATMPath } from '../Monitor/url';
import JaegerAPI, { DEFAULT_API_ROOT } from '../../api/jaeger';
import configureStore from '../../utils/configure-store';
import processScripts from '../../utils/config/process-scripts';
import prefixUrl from '../../utils/prefix-url';
import { isString } from '../../utils/ts/typeGuards/isString';
import ZoomManager from '../../utils/ZoomManager';
import { ZoomContext } from '../../Contexts';

import '../common/vars.css';
import '../common/utils.css';
import './index.css';

const history = createHistory();

export default class JaegerUIApp extends Component {
  constructor(props) {
    super(props);
    this.store = configureStore(history);
    JaegerAPI.apiRoot = DEFAULT_API_ROOT;
    processScripts();
    this.zoomManager = new ZoomManager();
    this._handleZoomKeyboardShortcuts = this._handleZoomKeyboardShortcuts.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this._handleZoomKeyboardShortcuts);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleZoomKeyboardShortcuts);
  }

  _handleZoomKeyboardShortcuts(e) {
    if (window.enableZoomControls && (e.metaKey || e.ctrlKey)) {
      switch (e.key) {
        case '-':
          this.zoomManager.zoomOut();
          break;
        case '=':
          this.zoomManager.zoomIn();
          break;
        default:
      }
    }
  }

  render() {
    // Navigate to URL provided on app start
    if (isString(window.initialRoutePath) && window.initialRoutePath) {
      const urlToNavigate = window.initialRoutePath;
      window.initialRoutePath = '';
      history.push(urlToNavigate);
    }

    return (
      <Provider store={this.store}>
        <ConnectedRouter history={history}>
          <ZoomContext.Provider value={this.zoomManager}>
            <Page>
              <Switch>
                <Route path={searchPath} component={SearchTracePage} />
                <Route path={traceDiffPath} component={TraceDiff} />
                <Route path={tracePath} component={TracePage} />
                <Route path={dependenciesPath} component={DependencyGraph} />
                <Route path={deepDependenciesPath} component={DeepDependencies} />
                <Route path={qualityMetricsPath} component={QualityMetrics} />
                <Route path={monitorATMPath} component={MonitorATMPage} />

                <Redirect exact path="/" to={searchPath} />
                <Redirect exact path={prefixUrl()} to={searchPath} />
                <Redirect exact path={prefixUrl('/')} to={searchPath} />

                <Route component={NotFound} />
              </Switch>
            </Page>
          </ZoomContext.Provider>
        </ConnectedRouter>
      </Provider>
    );
  }
}
