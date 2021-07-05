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
      document.onmouseup = () => {
        document.onmousemove = null;
      };

      const $resizer = $(event.target);
      const $resizingLine = $resizer.closest('[data-type=resizeble]');
      const coords = $resizingLine.getCoords();

      if (event.target.dataset.resize === 'row') {
        document.onmousemove = e => {
          $resizingLine.css({ height: (coords.height + e.pageY - event.pageY) + 'px', backgroundColor: 'red' });
        };
        return;
      }

      const resizingColNumber = $resizingLine.data.colNumber;
      const sheet = document.createElement('style');

      document.onmousemove = e => {
        const width = (coords.width + e.pageX - event.pageX) + 'px';
        sheet.innerHTML = `.excel__table .cell[data-col-number="${resizingColNumber}"], 
                            .column[data-col-number="${resizingColNumber}"] {width: ${width}}`;
        document.body.appendChild(sheet);
        // this.$root.findAll(`[data-col="${resizingColNumber}"]`)
        //     .forEach(el => el.style.width = width);
      };
    }
  }

  onMouseup = event => {
  }
}
