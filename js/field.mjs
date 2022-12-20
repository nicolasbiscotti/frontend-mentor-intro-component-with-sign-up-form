export default function createField({ initialState }) {
  let listeners = {};

  function subscribe(listener, selector) {
    addListener(listener, selector());
    listener(initialState[selector()]);
  }

  function setProp(value, selector) {
    initialState[selector()] = value;
    callListeners(value, selector());
  }
  
  function getState(selector) {
    if (typeof selector === "function") {
      return initialState[selector()];
    }
    return { ...initialState };
  }

  function callListeners(value, prop) {
    listeners[prop] && listeners[prop].forEach((listener) => listener(value));
  }

  function addListener(listener, prop) {
    if (listeners[prop]) {
      listeners[prop].add(listener);
    } else {
      listeners[prop] = new Set([listener]);
    }
  }

  return {
    subscribe,
    setProp,
    getState,
  };
}
