import { actions } from "./actions";
import { SetSpansWithResolvedLocationsData } from "./types";

export const state: {
  pendingOperationsCount: number,
  spansWithResolvedLocation: SetSpansWithResolvedLocationsData
} = {
  pendingOperationsCount: 0,
  spansWithResolvedLocation: {}
};

export const updateState = (action: string, payload: any) => {
  switch(action) {
    case (actions.GET_SPANS_WITH_RESOLVED_LOCATION):
      state.pendingOperationsCount++;
      break;
    case (actions.SET_SPANS_WITH_RESOLVED_LOCATION):
      state.spansWithResolvedLocation = payload;
      state.pendingOperationsCount--;
      break;
    default:
  }
}

