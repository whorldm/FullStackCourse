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

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
        this.getList()
            .then(({ data }) => {
                this.setState({
                    list: data
                });
            })
    }

    getList() {
        return fetch("http://localhost:9000/list")
            .then(res => res.json());
    }

    render() {
        return (
            <div className="container">
                <TabContext.Provider value={ALL_TABS}>
                    <Tabs tabs={TABS} />
                    <List
                        dataSource={this.state.list}
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
}

ReactDOM.render(
    <Main />,
    document.getElementById('app')
)