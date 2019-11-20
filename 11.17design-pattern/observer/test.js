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
    // namespace 可以传入字符串；也可以传入数组，同时监听多个事件
    observer.addSub(['add', 'another'], params => {
        sendLog({...params});
    }, {
        detectPrevious: true,  // 是否对事件进行探测，使用代理额外处理逻辑
        once: true  // 事件是否只执行一次
    });
};

// 拆分的刷新页面逻辑
const refreshListen = observer => {

    const refresh = (params) => {
        console.log('refresh!!!!', params)
    }

    // 监听，当add事件发生时，刷新页面
    observer.addSub('add', params => {
        refresh({...params});
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

    // let observer = new Observer();
    let observer = Observer.getInstance();

    // 监听并发送日志
    registerLog(observer);

    // 刷新页面
    refreshListen(observer);

    // 用户发生了点击
    tabAction(observer);
    // tabAction(observer);
    // tabAction(observer);
    // tabAction(observer);


    // observer.notify('another', {
    //     flag: 'another envent!!!!'
    // })
};

start();