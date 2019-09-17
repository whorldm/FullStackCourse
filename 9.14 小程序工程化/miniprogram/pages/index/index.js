//index.js
//获取应用实例
const app = getApp();
var api = new Proxy(wx, {
  get(target, key) {
    if (typeof target[key] === 'function') {
      return function (params, ...args) {
        return new Promise((resolve, reject) => {
          target[key]({
            ...params,
            success: (...args) => {
              resolve(...args);
              params.success && params.success(...args);
            }
          }, ...args);
        });
      }.bind(target);
    }
  }
})

Page({
  data: {
    list: []
  },
  onLoad: function () {
    api.request({
      url: 'http://localhost:8000/list',
      success: ({data}) => {
        console.log('ajax-return-msg:', data.data);
        this.setData({
          list: data.data
        })
      }
    })
    .then(res => {
      console.log('res:::', res)
    })
  }
})
