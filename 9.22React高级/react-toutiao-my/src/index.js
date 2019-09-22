/**
 * @file entry file
 * @author caoyaqin
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import List from './list';
import * as components from './components/items';
import Tabs from './tab';
import TabContext from './tab-context';

const TABS = [{
    id: '__all__',
    name: '推荐'
}, {
    id: 'video',
    name: '视频'
}];

const ALL_TABS = [
    {
		id: '__all__',
		name: '推荐'
	},
	{
		id: 'video',
		name: '视频'
	},
	{
		id: 'sport',
		name: '体育'
	},
	{
		id: 'history',
		name: '历史'
	}
]

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
        return (<div className="container">
            <TabContext.Provider value={ALL_TABS}>
                <Tabs tabs={TABS} />
                <List
                    dataSource={this.state.list}
                    renderItem={item => {
                        const type = item.type.replace(/^\w/, code => code.toUpperCase())
                        const ItemComponent = components[type];
                        return <ItemComponent
                                onClick={this.skip} 
                                data={item.data}
                                />;
                    }}
                />
            </TabContext.Provider>
        </div>);
    }

    skip() {
        console.log('hasClicked!!!')
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('app')
)