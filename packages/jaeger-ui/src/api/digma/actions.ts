import addActionPrefix from './addActionPrefix';

export const actions = {
  GO_TO_SPAN: 'GO_TO_SPAN',
  GET_SPANS_DATA: 'GET_SPANS_DATA',
  SET_SPANS_DATA: 'SET_SPANS_DATA',
  CLEAR: 'CLEAR',
};

const GLOBAL_ACTION_PREFIX = 'GLOBAL';

export const globalActions = addActionPrefix(GLOBAL_ACTION_PREFIX, {
  CHANGE_SCOPE: 'CHANGE_SCOPE',
  OPEN_URL_IN_DEFAULT_BROWSER: 'OPEN_URL_IN_DEFAULT_BROWSER',
});
