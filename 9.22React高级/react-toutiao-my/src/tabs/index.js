/**
 * @file Tabs component file
 * @author caoyaqin
 */

import React, { Component, Suspense } from 'react';
import style from './style.css';

// 代码分割(异步组件)
const SettingComponent = React.lazy(() => import('../setting'));
// const SettingComponent = React.lazy(() => {
//     return import('./setting')
//         .then(component => {
//             console.log('in-setting-component:', component);
//             return new Promise((resolve) => {
//                 setTimeout(() => {
//                     return resolve(component);
//                 }, 1000);
//             });
//         });
// });

export default class Tabs extends Component {

    constructor(props) {

        super(props);
        
        this.state = {
			showSetting: false
		};
    }

    render() {
        const { tabs } = this.props;
        return (
            <div className="header">
                <nav>
                    <div className="nav-content">
                    {
                        tabs.map(tab => {
                            return <span key={tab.id}>{tab.name}</span>
                        })
                    }
                    </div>
                    <a className="more-btn">
                        <span className="cross" onClick={this.onShowMore}></span>
                    </a>
                </nav>
                {
                    this.state.showSetting ? 
                    (<Suspense fallback={<div>Loading...</div>}>
                        <SettingComponent onHideMore={this.onHideMore}/>
                    </Suspense>) : null
                }
            </div>
        )
    }

    onShowMore = () => {
        this.setState({
            showSetting: true
        });
    }

    onHideMore = () => {
        this.setState({
            showSetting: false
        })
    }

}