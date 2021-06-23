import { $ } from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create('div', 'excel');
    // const $root = document.createElement('div');
    // $root.classList.add('excel');
    this.components.forEach( Component => {
      const $el = $.create('div', Component.className);
      // const $el = document.createElement('div');
      // $el.classList.add(Component.className);
      const component = new Component($el);
      $el.innerHTML = component.toHtml();
      $root.append($el);
      // $root.insertAdjacentHTML('beforeend', component.toHtml());
    });
    // $root.textContent = 'test';
    // $root.style.fontSize = '5rem';
    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
    // console.log('', this.$el);
    // this.$el.insertAdjacentHTML('afterbegin', '<h1>Test</h1>');
    // const node = document.createElement('h1');
    // node.textContent = 'TEST';
    // this.$el.append(node);
    // this.$el.appendChild(document.createElement('h1'));
  }
}
