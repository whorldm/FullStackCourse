/**
 * @file single-pic component file
 * @author caoyaqin
 */

import React, {Component} from 'react';
import { itemFy, clickAble } from '../decorators';

@itemFy(true)   /// 多个decorators是下往上执行(靠得最近的先执行)
export default class SinglePic extends Component {

    static classes = 'single-pic';

    render() {
        return (<div>单图</div>)
    }
}