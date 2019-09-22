/**
 * @file agriculture component file
 * @author caoyaqin
 */

import React, {Component} from 'react';
import { itemFy } from '../decorators';
import Echarts from './echarts';

@itemFy()
export default class Agriculture extends Component {

    static classes = '';

    render() {
        return (
            <div>
                农业
                <Echarts />
            </div>
        );
    }
}