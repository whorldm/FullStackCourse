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
                <div className="title">{title}</div>
                <div className="image-list">
                    {
                        imageList.map((image, index) => (
                            <img key={index} src={image} />
                        ))
                    }
                </div>
            </React.Fragment>
        )
    }
}