/**
 * @file entry file
 * @author caoyaqin
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import List from './list';
import * as components from './components/items';
import Tabs from './tabs';
import TabContext from './tabs/tab-context';
import { TABS, ALL_TABS } from './config';
import store from './store';
// import { Provider, connect } from 'react-redux';
import { Provider, connect } from './fake-react-redux';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
        this.onReachBottom();
    }

    getList() {
        return fetch("http://localhost:9000/list")
            .then(res => res.json());
    }

    render() {
        console.log('this.props:::', this.props);
        return (
            <div className="container">
                <TabContext.Provider value={ALL_TABS}>
                    <Tabs tabs={TABS} />
                    <List
                        dataSource={this.props.list}
                        renderItem={item => {
                            const type = item.type.replace(/^\w/, code => code.toUpperCase());
                            const ItemComponent = components[type];
                            return <ItemComponent 
                                    key={item.data.id}
                                    onClick={this.skip} 
                                    data={item.data}
                                    />;
                        }}
                    />
                </TabContext.Provider>
            </div>
        );
    }

    skip() {
        console.log('hasClicked!!!');
    }
    
    updateList() {
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
        return this.getList()
            .then(({ data }) => {
                return {
                    type: 'PUSH_LIST',
                    data
                }
            });
    }

    onReachBottom() {
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
        window.onscroll = () => {
            this.props.listUpdate(this.updateList());
        };
    }
}

const App = connect(
    function mapStateToProps(state) {
        console.log('state:::', state)
        return {
            list: state.list
        };
    },
    function mapDispatchToProps(dispatch) {
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
            listUpdate: task => {
                dispatch(task);
            }
        }
    }
)(Main);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)