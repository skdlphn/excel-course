import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  init() {
    super.init();
    this.formula = this.$root.find('[data-formula-input]');
    this.$on('table:input', $next => {
      this.formula.text($next.text());
    });

    this.$on('table:select', $next => {
      this.formula.text($next.text());
    });
    this.$on('table:init', $next => {
      this.formula.text($next.text());
    });
    // this.$subscribe( state => {
    //   console.log('FormulaState', state );
    // });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false" data-formula-input></div>
    `;
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:enter');
    }
  }
}
