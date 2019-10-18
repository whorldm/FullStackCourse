"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withRouter = exports.Link = exports.Switch = exports.Route = exports.BrowserRouter = exports.Router = void 0;

var _react = _interopRequireWildcard(require("react"));

var _pathToRegexp = _interopRequireDefault(require("path-to-regexp"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// 监听器
var eventEmitter = {
  listener: [],
  notify: function notify() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this.listener.forEach(function (fn) {
      return fn.apply(void 0, args);
    });
  },
  listen: function listen(func) {
    this.listener.push(func);
  }
};
/**
 * 创建一个react工程的context方法
 */

var createContext = function createContext() {
  var context = _react["default"].createContext(null);

  return context;
};
/**
 * 创建一个location对象
 * @param {String} path 路径
 * @param {String} state  需要透传的状态
 * @return {Object} location对象
 */


var createLocation = function createLocation(path, state) {
  var pathInfo = /^([^\?]*?)(\?[^#]*?)?(\#.*?)?$/.exec(path);
  return {
    pathname: pathInfo[1],
    search: pathInfo[2],
    hash: pathInfo[3],
    state: state
  };
};
/**
 * 获取当前URL上的location
 * @param {String}} state 透传的状态 
 */


var getDOMLocation = function getDOMLocation(state) {
  var window$location = window.location;
  var pathname = window$location.pathname;
  var search = window$location.search;
  var hash = window$location.hash;
  return createLocation("".concat(pathname).concat(search).concat(hash), state);
};

var createBrowserHistory = function createBrowserHistory() {
  var listen = function listen(func) {
    // 往事件监听器里添加一项
    eventEmitter.listen(func);
  };

  var DOMListen = function DOMListen(func) {
    window.addEventListener('popstate', func);
  };

  DOMListen(function (event) {
    console.log('location-refresh-pop');
    var action = 'POP'; // location发生变化，催动界面变化，设置新的状态

    var location = getDOMLocation(event.state);
    setState({
      action: action,
      location: location
    });
  });

  var push = function push(path, state) {
    var action = 'PUSH';
    var location = createLocation(path, state);
    window.history.pushState({
      state: state
    }, null, path);
    setState({
      action: action,
      location: location
    });
  };

  var setState = function setState(nextState) {
    // 催动界面变化，设置新的状态
    Object.assign(history, nextState); // 触发外部的监听器

    eventEmitter.notify(history);
  };

  return {
    push: push,
    listen: listen
  };
};

var RouterContext = createContext();

var Router =
/*#__PURE__*/
function (_Component) {
  _inherits(Router, _Component);

  function Router(props) {
    var _this;

    _classCallCheck(this, Router);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Router).call(this, props));
    _this.state = {
      action: '',
      location: getDOMLocation()
    };
    props.history.listen(function (_ref) {
      var action = _ref.action,
          location = _ref.location;

      _this.setState({
        action: action,
        location: location
      });
    });
    return _this;
  }

  _createClass(Router, [{
    key: "render",
    value: function render() {
      var contextValue = {
        history: this.props.history,
        location: this.state.location,
        match: {
          url: undefined,
          path: undefined,
          params: {
            id: '123321123321'
          }
        }
      };
      return _react["default"].createElement(RouterContext.Provider, {
        value: contextValue
      }, this.props.children);
    }
  }]);

  return Router;
}(_react.Component);

exports.Router = Router;
;

var BrowserRouter =
/*#__PURE__*/
function (_Component2) {
  _inherits(BrowserRouter, _Component2);

  function BrowserRouter() {
    var _getPrototypeOf2;

    var _this2;

    _classCallCheck(this, BrowserRouter);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(BrowserRouter)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this2.history = createBrowserHistory();
    return _this2;
  }

  _createClass(BrowserRouter, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement(Router, {
        history: this.history
      }, this.props.children);
    }
  }]);

  return BrowserRouter;
}(_react.Component);

exports.BrowserRouter = BrowserRouter;
;
/**
 * 比较组件的路由是否和页面的路由相等
 * @param {String} pathname 
 * @param {String} location 
 */

var matchPath = function matchPath(pathname, location) {
  return (0, _pathToRegexp["default"])(pathname).exec(location.pathname);
};

var Route =
/*#__PURE__*/
function (_Component3) {
  _inherits(Route, _Component3);

  function Route() {
    _classCallCheck(this, Route);

    return _possibleConstructorReturn(this, _getPrototypeOf(Route).apply(this, arguments));
  }

  _createClass(Route, [{
    key: "render",
    value: function render() {
      var DynamicComponent = this.props.component;
      var math = matchPath(this.props.path, this.context.location);
      return _react["default"].createElement(_react["default"].Fragment, null, math ? _react["default"].createElement(DynamicComponent, this.context) : null);
    }
  }]);

  return Route;
}(_react.Component);

exports.Route = Route;

_defineProperty(Route, "contextType", RouterContext);

;

var Switch =
/*#__PURE__*/
function (_Component4) {
  _inherits(Switch, _Component4);

  function Switch() {
    _classCallCheck(this, Switch);

    return _possibleConstructorReturn(this, _getPrototypeOf(Switch).apply(this, arguments));
  }

  _createClass(Switch, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react["default"].createElement(RouterContext.Consumer, null, function (context) {
        var location = _this3.props.location || context.location;
        var element, match;

        _react["default"].Children.forEach(_this3.props.children, function (child) {
          // child为Switch里面嵌套的route组件
          // match如果没有匹配到则默认渲染最后一个
          console.log('match', match);

          if (!match && _react["default"].isValidElement(child)) {
            element = child; // form用于<redirect form="..." ... >

            var path = child.props.path || child.props.from;
            console.log('path', path, 'location', location);
            console.log('mather----', matchPath(path, location)); // 匹配的match

            match = path ? matchPath(path, location) : '/404';
            console.log('new match', match);
          }
        });

        return match // 添加computedMatch props为match
        ? _react["default"].cloneElement(element, {
          location: location,
          computedMatch: match
        }) : null;
      });
    }
  }]);

  return Switch;
}(_react.Component);

exports.Switch = Switch;
;

var Link =
/*#__PURE__*/
function (_Component5) {
  _inherits(Link, _Component5);

  function Link() {
    _classCallCheck(this, Link);

    return _possibleConstructorReturn(this, _getPrototypeOf(Link).apply(this, arguments));
  }

  _createClass(Link, [{
    key: "navigateTo",
    value: function navigateTo() {
      console.log('this', this.context);
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("a", {
        onClick: this.navigateTo.bind(this)
      }, this.props.children);
    }
  }]);

  return Link;
}(_react.Component);

exports.Link = Link;

_defineProperty(Link, "contextType", RouterContext);

;

var withRouter = function withRouter(Component) {
  var C = function C(props) {
    var wrappedComponentRef = props.wrappedComponentRef,
        remainProps = _objectWithoutProperties(props, ["wrappedComponentRef"]);

    return _react["default"].createElement(RouterContext.Consumer, null, function (context) {
      return _react["default"].createElement(Component, _extends({}, remainProps, context, {
        ref: wrappedComponentRef
      }));
    });
  };

  C.WrappedComponet = Component;
  return (0, _hoistNonReactStatics["default"])(C, Component);
};

exports.withRouter = withRouter;