import { ExcelComponent } from '@core/ExcelComponent';
import * as actions from '@/redux/actions';
import { $ } from '@core/dom';
import { defaultTitle } from '@/constants';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    const buttons = [
      {
        icon: 'delete',
        value: 'delete'
      },
      {
        icon: 'exit_to_app',
        value: 'exit'
      },
    ];

    return `
      <input type="text" class="input" value="${ title }" />
      <div>
        ${buttons.map(this.toButton).join('')}
      </div>
    `;
  }

  toButton(button) {
    const meta = `
  data-type="button"
  data-value='${JSON.stringify(button.value)}'
  `;
    return `<div class="button">
        <i 
            class="material-icons"
            ${meta}
        >${ button.icon }
        </i>
      </div>`;
  }

  onInput(event) {
    this.$dispatch(actions.changeTitle($(event.target).text()));
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('header:tableOperation', value);
    }
  }
}
