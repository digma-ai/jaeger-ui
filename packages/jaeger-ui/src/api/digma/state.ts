import { actions } from './actions';
import { SetSpansDataPayload } from './types';

export const state: {
  pendingOperationsCount: number;
  spans: SetSpansDataPayload;
} = {
  pendingOperationsCount: 0,
  spans: {},
};

export const updateState = (action: string, payload: any) => {
  switch (action) {
    case actions.GET_SPANS_DATA:
      state.pendingOperationsCount++;
      break;
    case actions.SET_SPANS_DATA:
      state.spans = payload;
      state.pendingOperationsCount--;
      break;
    case actions.CLEAR:
      state.spans = {};
      state.pendingOperationsCount--;
      break;
    default:
  }
};
