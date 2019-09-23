/**
 * @file setting component file
 * @author caoyaqin
 */

import React, {Component} from 'react';
import TabContext from '../tabs/tab-context';
import style from './style.css';

export default class Setting extends Component {
    
    static contextType = TabContext;

    render() {
        // console.log('allTabs:::', this.props.allTabs);
        return (
            <div className="setting">
                <div className="toolbar">
                    <span className="backBtn" onClick={this.props.onHideMore}> 返回 </span>
                    <span className="title" >频道管理</span>
                </div>
                <ul className="controlDetail">
                    {
                        this.context.map(tab => {
                            return (
                                <li className="channelFigure tuijian" key={tab.id}>
                                    <a>{tab.name}</a>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}