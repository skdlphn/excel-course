import { CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE } from './types';
// import { toInlineStyles } from '@core/utils';

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE: {
      const field = action.data.type === 'col' ? 'colState' : 'rowState';
      return { ...state, [field]: value(state, field, action) };
    }
    case CHANGE_TEXT: {
      return { ...state, currentText: action.data.value, dataState: value(state, 'dataState', action) };
    }
    case CHANGE_STYLES:
      return { ...state, currentStyles: action.data };
    case APPLY_STYLE: {
      const val = state.stylesState;
      action.data.ids.forEach(id => {
        // val[id] = toInlineStyles(action.data.value);

        // val[id] = val[id] ? val[id] : [];
        // val[id].push( toInlineStyles(action.data.value));

        val[id] = { ...val[id], ...action.data.value };
      });
      return { ...state, stylesState: val, currentStyles: { ...state.currentStyles, ...action.data.value } };
    }
    default:
      return state;
  }
}

function value(state, field, action) {
  const val = state[field] || {};
  val[action.data.id] = action.data.value;
  return val;
}
