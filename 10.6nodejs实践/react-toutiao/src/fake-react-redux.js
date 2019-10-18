/**
 * @file react-redux
 * @author caoyaqin
 */

import React, { Component } from 'react';

const createContext = () => {
    return React.createContext(null);
};
const ReduxContext = createContext();

/**
 * Provider外层组件，获取store
 */
export class Provider extends Component {
    render() {
        const store = this.props.store;
        console.log('this.props.children', this.props.children);
        return (
            <ReduxContext.Provider value={store}>
                {this.props.children}
            </ReduxContext.Provider>
        );
    }
}

/**
 * connect方法,接受映射方法，返回HOC
 * @param {Function} mapStateProps 映射store上的state到props
 * @param {Function} mapDispathToProps 映射store上的dispatch到props
 * @param {React.Component} ConnnectComponent 需要HOC装饰的组件
 * @return {React.Component} 装饰后的方法
 */
export const connect = (mapStateProps, mapDispathToProps) => {
    return ConnnectComponent => {
        return class extends Component {
            
            static contextType = ReduxContext;

            constructor(props) {
                super(props);
                this.state = {
                    mergedProps: null
                }
            }

            componentDidMount() {
                const store = this.context;
                store.subscribe(() => {
                    // console.log('store', store.getState());
                    const mergedProps = this.computeProps(store);
                    if(mergedProps !== this.props.mergedProps) {
                        this.setState({mergedProps});
                    }
                });
            }

            computeProps(store) {
                const stateProps = mapStateProps(store.getState());
                const eventProps = mapDispathToProps((...args) => store.dispatch(...args));
                return {...stateProps, ...eventProps};
            }

            render() {
                console.log('I got this context::', this.context);
                const mergedProps = this.state.mergedProps || this.computeProps(this.context);
                return <ConnnectComponent {...mergedProps} {...this.props}/>
            }
        }
    }
}