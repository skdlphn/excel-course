const CODES = {
  A: 65,
  Z: 90,
};


function toColumn(col) {
  return `
    <div class="column">${col}</div>
  `;
}

function createRow(content, rowNumber = '') {
  return `
    <div class="row">
      <div class="row-info">${rowNumber}</div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A +1;
  const rows = [];

  const upperRowCols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  rows.push(createRow(upperRowCols));

  const cols = new Array(colsCount - 1)
      .fill('')
      .map(createCell)
      .join('');

  for (let i = 0; i < rowsCount; i++ ) {
    rows.push(createRow(cols, i + 1));
  }
  return rows.join('');
}

function createCell() {
  return `
    <div class="cell" contenteditable="true"></div>
  `;
}
