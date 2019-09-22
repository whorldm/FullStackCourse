/**
 * @file list component file
 * @author caoyaqin
 */

import React, {Component} from 'react';

export default class List extends Component {
    render() {
        const { dataSource = [], renderItem } = this.props;
        return (
            <div>
                {
                    dataSource.map(renderItem)
                }
            </div>
        )
    }
}