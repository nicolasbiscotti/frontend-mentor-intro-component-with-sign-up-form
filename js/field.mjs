export default function createField({ initialState }) {
  let listeners = {};

  function subscribe(listener, selector) {
    listeners[selector()] = listener;
    listener(initialState[selector()]);
  }
  function setProp(value, selector) {
    initialState[selector()] = value;
    listeners[selector()] && listeners[selector()](value);
  }
  function getState(selector) {
    if (typeof selector === "function") {
      return initialState[selector()];
    }
    return { ...initialState };
  }

  return {
    subscribe,
    setProp,
    getState,
  };
}
