import { ExcelComponent } from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  toHtml() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable="true" spellcheck="false"></div>
    `;
  }

  // onInput(event) {
  //   console.log('', this.$root );
  //   console.log('Formula on input', event.target.textContent.trim());
  // }
  onInput = event => {
    // eslint-disable-next-line no-invalid-this
    // console.log('Formula on input', event.target.textContent.trim());
    this.emitter.emit('is working', event.target.textContent.trim());
  }

  onClick() {
    console.log('click');
  }
}
