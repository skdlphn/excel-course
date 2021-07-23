import { toInlineStyles } from '@core/utils';
import { defaultStyles } from '@/constants';

const CODES = {
  A: 65,
  Z: 90
};

const COL_WIDTH = '120px';
const ROW_HEIGHT = 24;

function getWidth(state = {}, index) {
  return (state[index] || COL_WIDTH) + 'px';
}

function getHeight(state, index) {
  return (state.rowState && state.rowState[index] ? state.rowState[index] : ROW_HEIGHT) + 'px';
}

function toCell(row, state) {
  return function(_, col) {
    const id = `${ row }:${ col }`;
    const text = state.dataState[id] || '';
    // const styles = toInlineStyles(state.stylesState[id] ?? defaultStyles);
    const styles = toInlineStyles({ ...defaultStyles, ...state.stylesState[id] });
    return `
      <div 
        class="cell" 
        contenteditable 
        data-col="${ col }"
        data-type="cell"
        data-id="${id}"
        style="${styles}; width: ${getWidth(state.colState, col)}"
      >${text}</div>
    `;
  };
}

function toColumn({ col, index, width }) {
  return `
    <div class="column" data-type="resizable" data-col="${ index }" style="width: ${width}">
      ${ col }
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(index, content, state = {}) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
  // const height = state.rowState && state.rowState[index] ? state.rowState[index] : ROW_HEIGHT;
  return `
    <div class="row" 
    data-type="resizable" 
    data-row="${index}"
    style="height: ${getHeight(state, index)}"
    >
      <div class="row-info">
        ${ index ? index : '' }
        ${ resize }
      </div>
      <div class="row-data">${ content }</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function withWidthFrom(state) {
  return function(col, index) {
    return { col, index, width: getWidth(state.colState, index) };
  };
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1; // Compute cols count
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      // .map((col, index) => toColumn(col, index, state.colState))
      .join('');

  rows.push(createRow(null, cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row, state))
        .join('');

    rows.push(createRow(row + 1, cells, state));
  }

  return rows.join('');
}
