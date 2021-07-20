import { TABLE_RESIZE } from './types';

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE: {
      let prevState;
      let stateType;
      if (action.data.type === 'col') {
        prevState = state.colState || {};
        stateType = 'colState';
      } else {
        prevState = state.rowState || {};
        stateType = 'rowState';
      }
      prevState[action.data.id] = action.data.value;
      return { ...state, [stateType]: prevState };
    }
    default:
      return state;
  }
}
