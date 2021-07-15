import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { isCell, matrix, nextSelector, shouldResize } from './table.functions';
import { TableSelection } from '@/components/table/TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'keyup'],
      ...options
    });
  }

  toHTML() {
    return createTable(20);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);

    this.$on('formula:input', text => {
      this.selection.current.text(text);
    });

    this.$on('formula:enter', () => {
      // debugger;
      this.selection.current.focus();
    });
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${ id }"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
        this.$emit('table:change:text', this.selection.current.$el.textContent);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp'
    ];

    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selection.select($next);
    } else {
      // debugger;
      // console.log('target', event.target );
      // console.log('innerHTML', event.target.innerHTML );
      // console.log('$el.textContent', this.selection.current.$el.textContent );
      // this.$emit('table:typing', this.selection.current.textContent);
    }
  }

  onKeyup(event) {
    // console.log('target', event.target );
    // console.log('innerHTML', event.target.innerHTML );
    // console.log('$el.textContent', this.selection.current.$el.textContent );
    this.$emit('table:change:text', this.selection.current.$el.textContent);
  }
}
