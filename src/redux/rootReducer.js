import { CHANGE_TEXT, TABLE_RESIZE } from './types';

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE: {
      const stateType = action.data.type === 'col' ? 'colState' : 'rowState';
      const prevState = state[stateType] || {};
      prevState[action.data.id] = action.data.value;
      return { ...state, rowState: prevState };
    }
    case CHANGE_TEXT: {
      const prevState = state.dataState || {};
      prevState[action.data.id] = action.data.value;
      return { ...state, currentText: action.data.value, dataState: prevState };
    }
    default:
      return state;
  }
}
