"use strict";

var _redux = require("redux");

// reducer
var listProcessor = function listProcessor(state, action) {
  console.log('state-action', state, action);

  if (/INIT/.exec(action.type)) {
    // 初始化
    return [{
      name: 'yuanxin'
    }];
  } else if (action.type === 'PUSH_LIST') {
    return [action.data];
  }

  return state;
}; // store
// createStore创建的时候会默认调用一下dispatch({type: Action.INIT})初始化store的状态


var store = (0, _redux.createStore)(listProcessor);
console.log('store----', store.getState());
store.subscribe(function () {
  console.log('in-subscribe:::', store.getState());
}); // action

store.dispatch({
  type: 'PUSH_LIST',
  data: {
    title: '标题'
  }
});
console.log('store::', store.getState()); //---------------------------------------------
// var store = {};
// function changeLsit(store, action) {
//     store.state = [
//         action.data
//     ];
// }
// changeLsit({
//     data: {
//         title: '标题'
//     }
// });