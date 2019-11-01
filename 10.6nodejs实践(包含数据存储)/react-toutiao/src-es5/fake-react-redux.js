"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = exports.Provider = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var createContext = function createContext() {
  return _react["default"].createContext(null);
};

var ReduxContext = createContext();
/**
 * Provider外层组件，获取store
 */

var Provider =
/*#__PURE__*/
function (_Component) {
  _inherits(Provider, _Component);

  function Provider() {
    _classCallCheck(this, Provider);

    return _possibleConstructorReturn(this, _getPrototypeOf(Provider).apply(this, arguments));
  }

  _createClass(Provider, [{
    key: "render",
    value: function render() {
      var store = this.props.store;
      console.log('this.props.children', this.props.children);
      return _react["default"].createElement(ReduxContext.Provider, {
        value: store
      }, this.props.children);
    }
  }]);

  return Provider;
}(_react.Component);
/**
 * connect方法,接受映射方法，返回HOC
 * @param {Function} mapStateProps 映射store上的state到props
 * @param {Function} mapDispathToProps 映射store上的dispatch到props
 * @param {React.Component} ConnnectComponent 需要HOC装饰的组件
 * @return {React.Component} 装饰后的方法
 */


exports.Provider = Provider;

var connect = function connect(mapStateProps, mapDispathToProps) {
  return function (ConnnectComponent) {
    var _class, _temp;

    return _temp = _class =
    /*#__PURE__*/
    function (_Component2) {
      _inherits(_class, _Component2);

      function _class(props) {
        var _this;

        _classCallCheck(this, _class);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, props));
        _this.state = {
          mergedProps: null
        };
        return _this;
      }

      _createClass(_class, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          var _this2 = this;

          var store = this.context;
          store.subscribe(function () {
            // console.log('store', store.getState());
            var mergedProps = _this2.computeProps(store);

            if (mergedProps !== _this2.props.mergedProps) {
              _this2.setState({
                mergedProps: mergedProps
              });
            }
          });
        }
      }, {
        key: "computeProps",
        value: function computeProps(store) {
          var stateProps = mapStateProps(store.getState());
          var eventProps = mapDispathToProps(function () {
            return store.dispatch.apply(store, arguments);
          });
          return _objectSpread({}, stateProps, {}, eventProps);
        }
      }, {
        key: "render",
        value: function render() {
          console.log('I got this context::', this.context);
          var mergedProps = this.state.mergedProps || this.computeProps(this.context);
          return _react["default"].createElement(ConnnectComponent, _extends({}, mergedProps, this.props));
        }
      }]);

      return _class;
    }(_react.Component), _defineProperty(_class, "contextType", ReduxContext), _temp;
  };
};

exports.connect = connect;