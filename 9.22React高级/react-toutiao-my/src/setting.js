import React, {Component} from 'react';
import TabContext from './tab-context';
import style from './setting.css';

export default class Setting extends Component {
    
    static contextType = TabContext;

    render() {
        console.log('allTabs:::', this.props.allTabs)
        return (
            <div className="setting">
                {
                    this.context.map(tab => {
                        return <li>{tab.name}</li>
                    })
                }
            </div>
        )
    }
}