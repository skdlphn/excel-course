import { capitalize } from '@core/utils';

class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ?
      document.querySelector(selector) :
      selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, context) {
    this.handleEventContext = context;
    this.$el.addEventListener(eventType, this);
  }

  off(eventType) {
    this.$el.removeEventListener(eventType, this);
  }

  handleEvent(event) {
    const method = getMethodName(event.type);
    if (!this.handleEventContext[method]) {
      throw new Error(`Method ${method} is not implemented in ${this.name} Component`);
    }
    this.handleEventContext[method](event);
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }
}

// eslint-disable-next-line require-jsdoc
export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};

function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
