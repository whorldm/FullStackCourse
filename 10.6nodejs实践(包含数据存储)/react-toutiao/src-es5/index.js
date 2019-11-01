"use strict";

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRouterDom = require("react-router-dom");

var _app = _interopRequireDefault(require("./app"));

var _store = _interopRequireDefault(require("./store"));

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file entry file
 * @author caoyaqin
 */
var store = (0, _store["default"])(window.initListData);

_reactDom["default"].hydrate(React.createElement(_reactRouterDom.BrowserRouter, null, React.createElement(_reactRedux.Provider, {
  store: store
}, React.createElement(_app["default"], null))), document.getElementById('app'));