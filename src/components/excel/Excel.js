import { $ } from '@core/dom';
import { Emitter } from '@core/Emitter';

export class Excel {
  constructor(selector, options) {
    this.$excelElement = $(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  getRoot() {
    const $root = $.create('div', 'excel');
    const componentOptions = {
      emitter: this.emitter,
    };
    this.components = this.components.map( Component => {
      const $componentElement = $.create('div', Component.className);
      const component = new Component($componentElement, componentOptions);
      // DEBUG
      // if (component.name) {
      //   window['c' + component.name] = component;
      // }
      $componentElement.html(component.toHtml());
      $root.append($componentElement);
      return component;
    });
    return $root;
  }

  render() {
    this.$excelElement.append(this.getRoot());
    this.components.forEach(component => component.init());
    // this.components.forEach(component => component.destroy());
  }
}
