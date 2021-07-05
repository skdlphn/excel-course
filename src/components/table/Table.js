import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mouseup'],
    });
  }
  toHtml() {
    return createTable();
  }

  onClick() {
  }

  onMousedown = event => {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $resizingCol = $resizer.closest('[data-type=resizeble]');
      const coords = $resizingCol.getCoords();

      const resizingColNumber = $resizingCol.data.colNumber;

      const sheet = document.createElement('style');

      document.onmousemove = e => {
        const width = (coords.width + e.pageX - event.pageX) + 'px';
        sheet.innerHTML = `.excel__table .cell[data-col-number="${resizingColNumber}"], 
                            .column[data-col-number="${resizingColNumber}"] {width: ${width}}`;
        document.body.appendChild(sheet);
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }

  onMouseup = event => {
  }
}
