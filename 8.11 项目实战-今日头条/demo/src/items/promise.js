(function (global) {

    function Promise(excutor) {

        if (typeof excutor !== 'function') {
            throw new TypeError('Promise constructor\'s argument is not a function');
        }

        this.state = 'pending';
        this.value = null;
        this.reason = null;
        this.resolveCallbacks = [];
        this.rejectCallbacks = [];

        let resolve = value => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.resolveCallbacks.forEach(onFulfilled => onFulfilled())
            }
        };
        let reject = reason => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.rejectCallbacks.forEach(onRejected => onRejected())
            }
        };

        try {
            excutor(resolve, reject);
        } catch (err) {
            reject(err)
        }
    }
    // Promise的静态方法
    Promise.resolve = value => {
        if (value instanceof Promise) {
            return value;
        }
        return new Promise((resolve, reject) => resolve(value))
    };
    Promise.reject = reason => {
        return new Promise((resolve, reject) => reject(reason))
    };
    Promise.all = list => {
        return new Promise((resolve, reject) => {
            let values = [];
            let count = 0;
            for (let [i, p] of list.entries()) {
                // 数组参数可能不是Promise实例，须先调用Promise.resolve
                this.resolve(p).then(res => {
                    values[i] = res;
                    count++;
                    // 所有状态都变成fulfilled时返回的Promise状态就变成fulfilled
                    if (count === list.length) {
                        resolve(values);
                    }
                }, err => {
                    // 有一个被rejected时返回的Promise状态就变成rejected
                    reject(err);
                })
            }
        })
    }
    Promise.race = list => {
        return new Promise((resolve, reject) => {
            for (let p of list) {
                // 只要有一个实例率先改变状态，新的Promise的状态就跟着改变
                this.resolve(p).then(res => {
                    resolve(res)
                }, err => {
                    reject(err)
                })
            }
        })
    }
    // Promise的原型方法
    Promise.prototype = {
        constructor: Promise,

        then: function (onFulfilled, onRejected) {
            let nextPromise = new Promise((nextResolve, nextReject) => {
                // 成功时执行的函数
                let fulfilledCb = () => {
                    try {
                        if (typeof onFulfilled !== 'function') {
                            nextResolve(this.value);
                        } else {
                            let nextResult = onFulfilled(this.value);
                            if (nextResult instanceof Promise) {
                                nextResult.then(nextResolve, nextReject);
                            } else {
                                nextResolve(nextResult);
                            }
                        }
                    } catch (e) {
                        nextReject(e)
                    }
                }

                // 失败时执行的函数
                let rejectedCb = () => {
                    try {
                        if (typeof onRejected !== 'function') {
                            nextReject(this.reason)
                        } else {
                            let nextResult = onRejected(this.reason)
                            if (nextResult instanceof Promise) {
                                nextResult.then(nextResolve, nextReject);
                            } else {
                                nextReject(nextResult);
                            }
                        }
                    } catch (e) {
                        nextReject(e)
                    }
                }

                if (this.state === 'pending') {
                    this.resolveCallbacks.push(fulfilledCb);
                    this.rejectCallbacks.push(rejectedCb);
                }
                if (this.state === 'fulfilled') {
                    fulfilledCb();
                }
                if (this.state === 'rejected') {
                    rejectedCb();
                }
            })

            return nextPromise;
        },

        catch: function (onRejected) {
            return this.then(undefined, onRejected)
        },

        finally: function (cb) {
            return this.then(
                value => Promise.resolve(cb()).then(() => value),
                reason => Promise.resolve(cb()).then(() => reason)
            )
        }
    }

    global.Promise = Promise;

})(window)