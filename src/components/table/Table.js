import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { getIdOnKeydown, isCell, matrix, shouldResize } from '@/components/table/table.function';
import { TableSelection } from '@/components/table/TableSelection';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
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
    // console.log('init');
  }

  // cellDown(id) {
  //   // const id = $target.id(true);
  //   if (id.row > 13) {
  //     return id;
  //   }
  //   return `${++id.row}:${id.col}`;
  //   const newCurrent = this.$root.find(`[data-id="${++id.row}:${id.col}"]`);
  //   newCurrent.$el.focus();
  //   return newCurrent;
  // }

  onKeydown = event => {
    const id = getIdOnKeydown(event);
    const newCurrent = this.$root.find(`[data-id="${id.row}:${id.col}"]`);
    newCurrent.$el.focus();
    this.selection.select(newCurrent);
  }

  onMousedown = event => {
    const $target = $(event.target);
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  };
}
