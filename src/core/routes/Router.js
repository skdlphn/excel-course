import { $ } from '../dom';
import { ActiveRoute } from './ActiveRoute';
// import { ActiveRoute } from '@core/routes/ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided');
    }

    this.$placholder = $(selector);
    this.routes = routes;

    this.changePageHandler = this.changePageHandler.bind(this);
    this.page = null;
    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler(); // two routes
  }

  changePageHandler() {
    this.page?.destroy();
    this.$placholder.clear();

    const Page = ActiveRoute.path.includes('excel') ?
    this.routes.excel :
    this.routes.dashboard;

    this.page = new Page(ActiveRoute.param);
    this.$placholder.append(this.page.getRoot());

    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
