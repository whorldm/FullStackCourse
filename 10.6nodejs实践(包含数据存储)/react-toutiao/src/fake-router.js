/**
 * @file react-router-dom
 * @author caoyaqin
 * 
 */

import React, { Component } from 'react';
import pathToRegexp from "path-to-regexp";
import hoistStatics from "hoist-non-react-statics";

// 监听器
let eventEmitter = {
    listener: [],
    notify(...args) {
        this.listener.forEach(fn => fn(...args));
    },
    listen(func) {
        this.listener.push(func);
    }
}

/**
 * 创建一个react工程的context方法
 */
const createContext = () => {
   let context = React.createContext(null);
   return context;
};

/**
 * 创建一个location对象
 * @param {String} path 路径
 * @param {String} state  需要透传的状态
 * @return {Object} location对象
 */
const createLocation = (path, state) => {
    let pathInfo = /^([^\?]*?)(\?[^#]*?)?(\#.*?)?$/.exec(path);
    return {
        pathname: pathInfo[1],
        search: pathInfo[2],
        hash: pathInfo[3],
        state
    }
};

/**
 * 获取当前URL上的location
 * @param {String}} state 透传的状态 
 */
const getDOMLocation = state => {
    let window$location = window.location;
    let pathname = window$location.pathname;
    let search = window$location.search;
    let hash = window$location.hash;
    return createLocation(`${pathname}${search}${hash}`, state);
};

const createBrowserHistory = () => {

    const listen = func => {
        // 往事件监听器里添加一项
        eventEmitter.listen(func);
    };

    const DOMListen = func => {
        window.addEventListener('popstate', func);
    };

    DOMListen(event => {
        console.log('location-refresh-pop');
        let action = 'POP';
        // location发生变化，催动界面变化，设置新的状态
        let location = getDOMLocation(event.state);
        setState({
            action,
            location
        });
    });

    const push = (path, state) => {
        let action = 'PUSH';
        let location = createLocation(path, state);
        window.history.pushState({
            state
        }, null, path);
        setState({
            action,
            location
        });
    };

    const setState = nextState => {
        // 催动界面变化，设置新的状态
        Object.assign(history, nextState);
        // 触发外部的监听器
        eventEmitter.notify(history);
    };

    return {
        push,
        listen
    };
};

let RouterContext = createContext();

export class Router extends Component {

    constructor(props) {
        super(props);

        this.state = {
            action: '',
            location: getDOMLocation()
        };

        props.history.listen(({action, location}) => {
            this.setState({
                action,
                location
            });
        });
    }

    render() {
        const contextValue = {
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
        
        return (
            <RouterContext.Provider value={contextValue}>
                {this.props.children}
            </RouterContext.Provider>
        );
    }
};

export class BrowserRouter extends Component {
    
    constructor(...args) {
        super(...args);
        this.history = createBrowserHistory();
    }

    render() {
        return (
            <Router history={this.history}>
                {this.props.children}
            </Router>
        );
    }
};

/**
 * 比较组件的路由是否和页面的路由相等
 * @param {String} pathname 
 * @param {String} location 
 */
const matchPath = (pathname, location) => {
    return (pathToRegexp(pathname)).exec(location.pathname);
};

export class Route extends Component {

    static contextType = RouterContext;

    render() {
        
        const DynamicComponent = this.props.component;

        let math = matchPath(this.props.path, this.context.location);

        return (
            <React.Fragment>
                {
                    math ? <DynamicComponent {...this.context} /> : null
                }
            </React.Fragment>
        );
    }
};

export class Switch extends Component {
    render() {
        return (
            <RouterContext.Consumer>
                {
                    context => {
                        const location = this.props.location || context.location;
                        let element, match;
                        React.Children.forEach(this.props.children, child => {
                            // child为Switch里面嵌套的route组件
                            // match如果没有匹配到则默认渲染最后一个
                            console.log('match', match)
                            if (!match && React.isValidElement(child)) {
                                element = child;
                
                                // form用于<redirect form="..." ... >
                                const path = child.props.path || child.props.from;
                                console.log('path', path, 'location', location)
                                console.log('mather----', matchPath(path, location))
                                // 匹配的match
                                match = path ? matchPath(path, location) : '/404';
                                console.log('new match', match)
                            }
                        });
                
                        return match  // 添加computedMatch props为match
                            ? React.cloneElement(element, { location, computedMatch: match })
                            : null;
                    }
                }
            </RouterContext.Consumer>
        );
    }
};

export class Link extends Component {

    static contextType = RouterContext;

    navigateTo() {
        console.log('this', this.context)
    }

    render() {
        return (
            <a onClick={this.navigateTo.bind(this)}>
                {this.props.children}
            </a>
        );
    }
};

export const withRouter = (Component) => {
    const C = props => {
        const { wrappedComponentRef, ...remainProps } = props;

        return (
            <RouterContext.Consumer>
                {
                    context => {
                        return (
                            <Component {...remainProps} {...context} ref={wrappedComponentRef} />
                        );
                    }
                }
            </RouterContext.Consumer>
        );
    };

    C.WrappedComponet = Component;
    
    return hoistStatics(C, Component);
}