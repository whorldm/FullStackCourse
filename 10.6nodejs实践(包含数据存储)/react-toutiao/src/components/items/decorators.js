/**
 * @file decorators file
 * @author caoyaqin
 */

import React, {Component} from 'react';

// 相同类名以及是否可点击的装饰器
// 柯里化
export const itemFy = hasClick => ItemComponent => {
    return class extends Component {
        render() {
            return (
                <div 
                    className={`item ${ItemComponent.classes}`} 
                    onClick={hasClick ? this.props.onClick : () => {}}>
                    <ItemComponent {...this.props} />
                </div>
            )
        }   
    }
}

// 可点击的装饰器
export const clickAble = ItemComponent => {
    return class extends Component {
        render() {
            return (
                <div onClick={this.props.onClick}>
                    <ItemComponent {...this.props}/>
                </div>
            )
        }
    }
}