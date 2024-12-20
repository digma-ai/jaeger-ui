// Copyright (c) 2018 Uber Technologies, Inc.
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

import _get from 'lodash/get';

import { EmbeddedState } from '../types/embedded';
import { getEmbeddedState, VERSION_0 } from '../utils/embedded-url';

export default function embeddedConfig(state: EmbeddedState | undefined) {
  if (state === undefined) {
    let search = _get(window, 'location.search');

    const params = new URLSearchParams(search);
    if (typeof window.embeddedMode === 'boolean' && window.embeddedMode && !params.get('uiEmbed')) {
      params.set('uiEmbed', VERSION_0);
      search = params.toString();
    }

    return search ? getEmbeddedState(search) : null;
  }
  return state;
}
