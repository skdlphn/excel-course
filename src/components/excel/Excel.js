import { $ } from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.$excelElement = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create('div', 'excel');
    this.components = this.components.map( Component => {
      const $componentElement = $.create('div', Component.className);
      const component = new Component($componentElement);
      $componentElement.html(component.toHtml());
      $root.append($componentElement);
      return component;
    });
    return $root;
  }

  render() {
    this.$excelElement.append(this.getRoot());
    this.components.forEach(component => component.init());
  }
}
