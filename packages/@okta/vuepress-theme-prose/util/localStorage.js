
const _hasLocalStorage = () => {
  try {
    return "localStorage" in window && window["localStorage"] !== null;
  } catch (e) {
    return false;
  }
}

const _getItem = (key) => {
  return window.localStorage.getItem(key);
}

const getItem = (key) => {
  if (_hasLocalStorage()) {
    return _getItem(key);
  }
}

const _setItem = (key, value) => {
  window.localStorage.setItem(key, value);
}

const setItem = (key, value) => {
  if (_hasLocalStorage()) {
    _setItem(key, value);
  }
}

const _removeItem = (key) => {
  window.localStorage.removeItem(key);
}

const removeItem = (key) => {
  if (_hasLocalStorage()) {
    _removeItem(key);
  }
}

const _clear = () => {
  window.localStorage.clear()
}

const clear = () => {
  if (_hasLocalStorage()) {
    _clear();
  }
}

export default {
  getItem,
  setItem,
  removeItem,
  clear
}
