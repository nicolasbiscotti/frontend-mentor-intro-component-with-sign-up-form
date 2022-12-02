export default function createErrorLog({ initialList }) {
  const listeners = new Set();

  function subscribe(listener) {
    listeners.add(listener);
    listener(copyObjectList(initialList));
  }
  function setErrorList(newList) {
    initialList = copyObjectList(newList);
    const toMakeTheCopyOnece = copyObjectList(newList);
    listeners.forEach((listener) => listener(toMakeTheCopyOnece));
  }

  return {
    subscribe,
    setErrorList,
  };
}

function copyObjectList(list) {
  return list.map((obj) => ({ ...obj }));
}
