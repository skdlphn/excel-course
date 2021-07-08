import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { shouldResize, shouldSelect } from '@/components/table/table.function';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }
  toHtml() {
    return createTable();
  }

  onClick() {
  }

  onMousedown = event => {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (shouldSelect(event)) {
      this.selectCell(event.target);
    }
  }
}
