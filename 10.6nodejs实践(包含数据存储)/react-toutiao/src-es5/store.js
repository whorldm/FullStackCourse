"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var toutiaoProcessor = function toutiaoProcessor(state, action) {
  console.log('I got an action:::', action);

  if (action.type === 'PUSH_LIST') {
    return _objectSpread({}, state, {
      list: state.list.concat(action.data)
    });
  }

  return state;
};

var reduxPromise = function reduxPromise(_ref) {
  var dispatch = _ref.dispatch,
      getState = _ref.getState;
  return function (next) {
    return function (action) {
      console.log('reduxPromise:::', action, next);

      if (typeof action.then === 'function') {
        return action.then(next);
      }

      return next(action);
    };
  };
};

var store = function store() {
  var initState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    list: []
  };
  return (0, _redux.createStore)(toutiaoProcessor, initState, (0, _redux.applyMiddleware)(reduxPromise));
};

var _default = store;
exports["default"] = _default;