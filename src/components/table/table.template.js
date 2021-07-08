const CODES = {
  A: 65,
  Z: 90,
};


function toColumn(col, index) {
  return `
    <div class="column" data-type="resizeble" data-col-number="${index}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(content, rowNumber = '') {
  const resizer = rowNumber ? `<div class="row-resize" data-resize="row"></div>` : '';
  return `
    <div class="row" data-type="resizeble" id="excel__table">
      <div class="row-info">
        ${rowNumber}
        ${resizer}
      </div>
      <div class="row-data" data-row-number="${rowNumber}">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

// function createCell(row, col) {
//   return `
//     <div class="cell" contenteditable="true" data-col-number="${col}" data-rowl-number="${row}"></div>
//   `;
// }
function createCell(row) {
  return function(_, col) {
    return `
    <div class="cell" contenteditable="true" 
    data-col-number="${col}" 
    data-id="${row}:${col}"></div>
  `;
  };
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


  for (let row = 0; row < rowsCount; row++ ) {
    const cols = new Array(colsCount - 1)
        .fill('')
        // .map((_, col) => createCell(row, col))
        .map(createCell(row))
        .join('');
    rows.push(createRow(cols, row + 1));
  }
  return rows.join('');
}
