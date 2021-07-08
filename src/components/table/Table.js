import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { shouldResize, shouldSelect } from '@/components/table/table.function';
import { TableSelection } from '@/components/table/TableSelection';
import { $ } from '@core/dom';

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

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const cell = this.$root.find('[data-id="0:0"]');
    this.selection.select(cell);
    console.log('init');
  }

  onMousedown = event => {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (shouldSelect(event)) {
      this.selection.select($(event.target));
    }
  }
}
