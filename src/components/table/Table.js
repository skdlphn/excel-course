import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  xCoordinate = 0;
  resizing = false;
  resizingCol = '';
  INITIAL_WIDTH = 120;

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mousemove', 'mouseup'],
    });
  }
  toHtml() {
    return createTable();
  }

  onClick() {
  }

  onMousedown = event => {
    if (event.target.dataset.resize) {
      this.xCoordinate = event.x;
      this.resizing = true;
      this.resizingCol = event.target.parentElement;
    }
  }

  onMousemove = event => {
    if (this.resizing) {
      this.resizingCol.style.width = `${this.INITIAL_WIDTH + parseInt(event.x) - this.xCoordinate}px`;
    }
  }

  onMouseup = event => {
    this.resizing = false;
  }
}
