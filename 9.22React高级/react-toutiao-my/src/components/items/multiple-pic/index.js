/**
 * @file multiple-pic component file
 * @author caoyaqin
 */

import React, {Component} from 'react';
import { itemFy } from '../decorators';
import style from './style.css';

@itemFy(true)
export default class MultiplePic extends Component {

    static classes = 'multiple-pic';

    render() {
        const { title, imageList } = this.props.data;
        return (
            <React.Fragment>
                <h3>{title}</h3>
                <img src={imageList[0]} />
            </React.Fragment>
        )
    }
}