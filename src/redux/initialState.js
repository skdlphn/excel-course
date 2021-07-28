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
};

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

export function normalizeInitialState(state, key) {
  return state ? normalize(state) : { ...clone(defaultState), stateKey: key };
}
