import { storage } from '@core/utils';
import { defaultStyles, defaultTitle } from '@/constants';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {'0:1': 'foo'}
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  title: defaultTitle,
};

export const initialState = { ...(storage('excel-state') ?? defaultState), currentStyles: defaultState.currentStyles };

