export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach( listener => {
      this.$root.on(listener, this);
    });
  }

  removeDOMListeners(domListener) {
    this.listeners.forEach( listener => {
      if (domListener.includes(listener)) {
        this.$root.off(listener);
      }
    });
  }
}
