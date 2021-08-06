import { createStore } from './createStore';

const initialState = {
  count: 0,
};

const reducer = (state = initialState, action) => {
  if (action.type === 'ADD') {
    return { ...state, count: ++state.count };
  }
  return state;
};

describe('create store:', () => {
  let store;
  let handler;

  beforeEach(() => {
    store = createStore(reducer, initialState);
    handler = jest.fn();
  });

  test('should return object', () => {
    expect(store).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.getState).not.toBeUndefined();
  });

  test('store should be object', () => {
    expect(store.getState()).toBeInstanceOf(Object);
  });

  test('should return default state', () => {
    expect(store.getState()).toEqual(initialState);
  });

  test('should change state if action exist', () => {
    store.dispatch({ type: 'ADD' });
    expect(store.getState().count).toEqual(1);
  });

  test('should not change state if action don\'t exist', () => {
    store.dispatch({ type: 'NOT_EXISTING_ACTION' });
    expect(store.getState().count).toBe(0);
  });

  test('should call subscriber function', () => {
    store.subscribe(handler);
    store.dispatch({ type: 'ADD' });

    expect(handler).toBeCalled();
    expect(handler).toBeCalledWith(store.getState());
  });

  test('should NOT call sub if unsubscribe', () => {
    const sub = store.subscribe(handler);
    sub.unsubscribe();
    store.dispatch({ type: 'ADD' });

    expect(handler).not.toBeCalled();
  });

  test('should dispatch in async way', () => {
    return new Promise(resolve => {
      setTimeout(() => {
        store.dispatch({ type: 'ADD' });
      }, 500);

      setTimeout(() => {
        expect(store.getState().count).toBe(1);
        resolve();
      }, 1000);
    });
  });
});
