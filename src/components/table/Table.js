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

      const $rowData = $resizer.closest('[data-row-number]');
      const resizingColNumber = Array.from($rowData.$el.children).indexOf($resizingCol.$el);

      const $upperRow = $resizer.closest('[data-type=row]');
      document.onmousemove = e => {
        $resizingCol.$el.style.width = (coords.width + e.pageX - event.pageX) + 'px';

        let $tableRow = $upperRow.$el.nextElementSibling;
        let $tableRowCol;
        do {
          $tableRowCol = $tableRow.querySelector(`[data-col-number="${resizingColNumber}"]`);
          $tableRowCol.style.width = (coords.width + e.pageX - event.pageX) + 'px';
          $tableRow = $tableRow.nextElementSibling;
        } while ($tableRow);
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }

  onMouseup = event => {
  }
}
