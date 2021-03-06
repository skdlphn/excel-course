import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { isCell, matrix, nextSelector, shouldResize } from './table.functions';
import { TableSelection } from '@/components/table/TableSelection';
import * as actions from '@/redux/actions';
import { defaultStyles } from '@/constants';
import { parse } from '@core/parse';
import { ActiveRoute } from '@core/routes/ActiveRoute';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  toHTML() {
    return createTable(20, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));
  }

  init() {
    super.init();
    // initResize(this.$root, this.store.getState());

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell($cell);

    this.$on('formula:input', value => {
      this.selection.current
          .attr('data-value', value);
      this.selection.current.text(parse(value)?.toString());
      this.updateTextInStore(parse(value));
    });

    this.$on('formula:enter', () => {
      this.selection.current.focus();
    });

    this.$on('header:tableOperation', value => {
      if (value === 'delete') {
        const decision = confirm('Assert removing');
        if (decision) {
          localStorage.removeItem('excel:' + ActiveRoute.param);
          ActiveRoute.navigate('');
        }
      }
      ActiveRoute.navigate('');
      // window.location.href = 'http://localhost:3000';
    });

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds,
      }));
    });
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn('Resize Error', e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${ id }"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
        this.$emit('table:input', this.selection.current);
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
      this.selectCell($next);
      // this.selection.select($next);
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }));
  }

  onInput(event) {
    // this.$emit('table:input', $(event.target));
    // const text = $(event.target).text();
    this.updateTextInStore($(event.target).text());
    // this.$dispatch(actions.changeText({
    //   id: this.selection.current.id(),
    //   value: $(event.target).text()
    // }));
  }
}
