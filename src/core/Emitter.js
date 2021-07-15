export class Emitter {
  constructor() {
    this.listeners = {};
  }

  // dispatch, fire, trigger
  //  notify listeners if they exist
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach(listener => {
      listener(...args);
    });
    return true;
  }

  // on listen
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      this.listeners[event] = this.listeners[event].filter(listener => listener !== fn);
    };
  }
}

// const emitter = new Emitter();
//
// const unsubscribe = emitter.subscribe('excel', data => console.log('subscribe Data', data ));
//
// emitter.emit('excel', 55);
//
// setTimeout( () => emitter.emit('excel', 'After two seconds'), 2000);
//
// unsubscribe();
//
// setTimeout( () => emitter.emit('excel', 'After fore seconds'), 4000);

