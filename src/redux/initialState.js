import { defaultStyles, defaultTitle } from '@/constants';
import { clone } from '@core/utils';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {'0:1': 'foo'}
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  title: defaultTitle,
  lastOpen: null,
};

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState);
}
