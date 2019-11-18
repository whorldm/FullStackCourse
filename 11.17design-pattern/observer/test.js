/**
 * @file 订阅器的测试用例
 * @author caoyaqin
 */
const Observer = require('./observer');

// 拆分的打日志逻辑
const registerLog = observer => {
    const sendLog = (params) => {
        console.log('log!!!!', params);
    };
    // 监听，当add事件发生时，打印日志
    observer.addSub(['add', 'refresh'], params => {
        sendLog({...params});
    }, {
        detectPrevious: true
    });
};
// 拆分的刷新页面逻辑
const refreshListen = observer => {
    // 监听，当add事件发生时，刷新页面
    observer.addSub('add', params => {
        // refresh();
    });
};

const tabAction = observer => {
    // 发布，告诉所有订阅者，add事件发生了
    observer.notify('add', {
        sum: 5
    });
    // 页面跳转为主逻辑，通常不建议拆分
    // window.location.href = 'xxxx';
    // 将下列附加的事件逻辑拆分
    // log('');
    // refresh('');
}

const start = () => {
    let observer = new Observer();

    // 监听并发送日志
    registerLog(observer);

    // 用户发生了点击
    tabAction(observer);
};

start();