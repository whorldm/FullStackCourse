/**
 * @file single-pic component file
 * @author caoyaqin
 */

import React, {Component} from 'react';
import { itemFy, clickAble } from '../decorators';
import style from './style.css';

@itemFy(true)   /// 多个decorators是下往上执行(靠得最近的先执行)
export default class SinglePic extends Component {

    static classes = 'single-pic';

    render() {
        const { title, imageList } = this.props.data;
        return (
            <React.Fragment>
                <div className="content">
                    <span>{title}</span>
                </div>
                <img src={imageList[0]} />
            </React.Fragment>
        );
    }
}