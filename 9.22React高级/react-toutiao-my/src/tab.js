import React, { Component, Suspense } from 'react';

// 代码分割(异步组件)
const SettingComponent = React.lazy(() => import('./setting'));
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

    constructor(...args) {

        super(...args);
        
        this.state = {
			showSetting: false
		};
    }

    render() {
        const { tabs } = this.props;
        return (
            <div>
                {
                    tabs.map(tab => {
                        return <span>{tab.name}</span>
                    })
                }
                <span onClick={() => this.onShowMore()}>+</span>
                {
                    this.state.showSetting ? 
                    (<Suspense fallback={<div>Loading...</div>}>
                        <SettingComponent />
                    </Suspense>) : null
                }
            </div>
        )
    }

    onShowMore() {
        this.setState({
            showSetting: true
        });
    }

}