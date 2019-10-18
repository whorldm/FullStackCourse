"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _style = _interopRequireDefault(require("./style.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// 代码分割(异步组件)
var SettingComponent = _react["default"].lazy(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../setting'));
  });
}); // const SettingComponent = React.lazy(() => {
//     return import('./setting')
//         .then(component => {
//             console.log('in-setting-component:', component);
//             return new Promise((resolve) => {
//                 setTimeout(() => {
//                     return resolve(component);
//                 }, 1000);
//             });
//         });
// });


var Tabs =
/*#__PURE__*/
function (_Component) {
  _inherits(Tabs, _Component);

  function Tabs(props) {
    var _this;

    _classCallCheck(this, Tabs);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tabs).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onShowMore", function () {
      _this.setState({
        showSetting: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onHideMore", function () {
      _this.setState({
        showSetting: false
      });
    });

    _this.state = {
      showSetting: false
    };
    return _this;
  }

  _createClass(Tabs, [{
    key: "render",
    value: function render() {
      var tabs = this.props.tabs;
      return _react["default"].createElement("div", {
        className: "header"
      }, _react["default"].createElement("nav", null, _react["default"].createElement("div", {
        className: "nav-content"
      }, tabs.map(function (tab) {
        return _react["default"].createElement("span", {
          key: tab.id
        }, tab.name);
      })), _react["default"].createElement("a", {
        className: "more-btn"
      }, _react["default"].createElement("span", {
        className: "cross",
        onClick: this.onShowMore
      }))), this.state.showSetting ? _react["default"].createElement(_react.Suspense, {
        fallback: _react["default"].createElement("div", null, "Loading...")
      }, _react["default"].createElement(SettingComponent, {
        onHideMore: this.onHideMore
      })) : null);
    }
  }]);

  return Tabs;
}(_react.Component);

exports["default"] = Tabs;