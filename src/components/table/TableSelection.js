import { $ } from '@core/dom';

export class TableSelection {
  selectedCell = null;

  constructor() {
  }

  selectCell(element) {
    if (this.selectedCell) {
      this.selectedCell.style.outline = '';
    }
    this.selectedCell = element;
    element.style.outline = '2px solid #3c74ff';
  }

  selectCellsGroup() {

  }

  getCellNumber(element) {
    const $parentRow = $(element).closest('[data-row-number]');
    const $rowNumber = $parentRow.data.rowNumber;
    const $colNumber = $(element).data.colNumber;
    return { rowNumber: $rowNumber, colNumber: $colNumber };
  }

  colNumber(element) {
    return $(element).data.colNumber;
  }

  rowNumber(element) {
    const $parentRow = $(element).closest('[data-row-number]');
    return $parentRow.data.rowNumber;
  }
}
