import { storage } from '@core/utils';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {'0:1': 'foo'}
  currentText: '',
};

export const initialState = storage('excel-state') ?? defaultState;

