/**
 * @file 订阅者模式
 * @author caoyaqin
 */

class QueuePool {
    constructor() {
        this.pool = [];
    }

    get(namespace) {
        if (!this.pool[namespace]) {
            this.pool[namespace] = [];
        }
        return this.pool[namespace];
    }

    has(namespace) {
        return !!this.pool[namespace];
    }

    pushTo(namespace, item) {
        this.get(namespace).push(item);
    }

    del(namespace, item) {
        if (!item) {
            this.pool[namespace] = [];
        } else {
            this.pool[namespace] = this.pool[namespace].filter(
                originItem => originItem !== item
            );
        }
    }
}

module.exports = class Observer {
    // 单例模式
    static getInstance() {
        if (!this.instance) {
            this.instance = new Observer();
        }
        return this.instance;
    }

    constructor() {
        this.handlers = new QueuePool();
        this.messages = new QueuePool();
    }

    notify(namespace, message, options = {}) {
        this.handlers.get(namespace).forEach(handler => {
            handler && handler(message);
        });
        // 派发事件的once，节省内存空间
        if (!options.once) {
            this.messages.pushTo(namespace, message);
        }
        return this; // 支持链式调用
    }

    addSub(namespace, subHandler, options = {}) {
        if (Object.prototype.toString.call(namespace) === "[object Array]") {
            namespace.forEach(nameItem => {
                this.addSub(nameItem, subHandler, options);
            });
            return this;
        }

        this.handlers.pushTo(
            namespace,
            this.handlerProxy(namespace, subHandler, options.once)
        );

        if (options.detectPrevious && this.messages.has(namespace)) {
            const message = this.messages.get(namespace);
            this.handlerProxy(namespace, subHandler, options.once)(message);
        }

        return this;
    }

    removeSub(namespace, handler) {
        this.handlers.del(namespace, handler);
        return this;
    }

    // 代理——可以进行额外的逻辑，如：处理事件是否只执行一次
    handlerProxy(namespace, handler, once) {
        let proxyHandler = message => {
            if (once) {
                this.removeSub(namespace, proxyHandler);
            }
            return handler.call(this, message);
        };
        return proxyHandler;
    }
};
