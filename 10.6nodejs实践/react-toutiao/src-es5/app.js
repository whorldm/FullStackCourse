"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _list = _interopRequireDefault(require("./list"));

var components = _interopRequireWildcard(require("./components/items"));

var _tabs = _interopRequireDefault(require("./tabs"));

var _detail = _interopRequireDefault(require("./detail"));

var _tabContext = _interopRequireDefault(require("./tabs/tab-context"));

var _config = require("./config");

var _store = _interopRequireDefault(require("./store"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// import { BrowserRouter, Route, Switch } from './fake-router';
var Main =
/*#__PURE__*/
function (_Component) {
  _inherits(Main, _Component);

  function Main(props) {
    var _this;

    _classCallCheck(this, Main);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Main).call(this, props));
    _this.state = {
      list: []
    };
    _this.uniqueStr = 0;

    _this.onReachBottom();

    return _this;
  }

  _createClass(Main, [{
    key: "getList",
    value: function getList() {
      return fetch("http://localhost:9000/list").then(function (res) {
        return res.json();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      console.log('this.props:::', this.props);
      return _react["default"].createElement("div", {
        className: "container"
      }, _react["default"].createElement(_tabContext["default"].Provider, {
        value: _config.ALL_TABS
      }, _react["default"].createElement(_tabs["default"], {
        tabs: _config.TABS
      }), _react["default"].createElement(_list["default"], {
        dataSource: this.props.list,
        renderItem: function renderItem(item) {
          var type = item.type.replace(/^\w/, function (code) {
            return code.toUpperCase();
          });
          var ItemComponent = components[type];
          return _react["default"].createElement(ItemComponent, {
            key: item.data.id,
            onClick: _this2.skip.bind(_this2),
            data: item.data
          });
        }
      })));
    }
  }, {
    key: "skip",
    value: function skip() {
      console.log('hasClicked!!!');
      this.props.history.push('/detail/' + 'i672763421225964391' + Math.random() * 10);
    }
  }, {
    key: "updateList",
    value: function updateList() {
      var _this3 = this;

      // 版本一：使用redux
      // this.getList()
      //     .then(({ data }) => {
      //         this.setState({
      //             list: data
      //         });
      //     });
      // 版本二：使用react-redux 
      // return this.getList()
      //     .then(({ data }) => {
      //         return data;
      //     });
      // 版本三：
      return this.getList().then(function (_ref) {
        var data = _ref.data;
        // 处理下拉加载相同数据时id值相同的警告
        data.forEach(function (item) {
          item.data.id += _this3.uniqueStr;
          _this3.uniqueStr++;
        });
        return {
          type: 'PUSH_LIST',
          data: data
        };
      });
    }
  }, {
    key: "onReachBottom",
    value: function onReachBottom() {
      var _this4 = this;

      // 版本一：使用redux
      // store.subscribe(() => {
      //     this.setState({
      //         list: store.getState().list
      //     });
      // });
      // this.updateList().then(data => {
      //     store.dispatch({
      //         type: 'PUSH_LIST',
      //         data
      //     });
      // });
      // window.onscroll = () => {
      //     this.updateList().then(data => {
      //         store.dispatch({
      //             type: 'PUSH_LIST',
      //             data
      //         });
      //     });
      // }
      // 版本二： 使用react-redux
      // console.log('my-props::::', this.props);
      // this.updateList().then(data => {
      //     this.props.listUpdate(data);
      // });
      // window.onscroll = () => {
      //     this.updateList().then(data => {
      //         this.props.listUpdate(data);
      //     });
      // }
      // 版本三：使用midware,使的dispacth可以传递一个promise对象
      this.props.listUpdate(this.updateList());

      window.onscroll = function () {
        _this4.props.listUpdate(_this4.updateList());
      };
    }
  }]);

  return Main;
}(_react.Component);

var App = (0, _reactRedux.connect)(function mapStateToProps(state) {
  console.log('state:::', state);
  return {
    list: state.list
  };
}, function mapDispatchToProps(dispatch) {
  // 版本二
  // return {
  //     listUpdate: data => {
  //         dispatch({
  //             type: 'PUSH_LIST',
  //             data
  //         })
  //     }
  // }
  // 版本三
  return {
    listUpdate: function listUpdate(task) {
      dispatch(task);
    }
  };
})(Main);

var AppContainer = function AppContainer() {
  var NoMatch = function NoMatch() {
    return _react["default"].createElement("div", null, "\u6211\u662F404");
  };

  return _react["default"].createElement(_reactRouterDom.Switch, null, _react["default"].createElement(_reactRouterDom.Route, {
    path: "/home",
    component: App
  }), _react["default"].createElement(_reactRouterDom.Route, {
    path: "/detail/:id",
    component: _detail["default"]
  }), _react["default"].createElement(_reactRouterDom.Route, {
    component: NoMatch
  }));
};

var _default = AppContainer; // ReactDOM.render(
//     <Provider store={store}>
//         <AppContainer />
//     </Provider>,
//     document.getElementById('app')
// )

exports["default"] = _default;