/**
 * @file list component file
 * @author caoyaqin
 */

import React, {Component} from 'react';
import style from './style.css';

export default class List extends Component {
    render() {
        const { dataSource = [], renderItem } = this.props;
        return (
            <div className="list-content">
                {
                    dataSource.map(renderItem)
                }
            </div>
        )
    }
}