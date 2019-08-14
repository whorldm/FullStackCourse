/**
 * @file 单图的组件
 * @author 曹雅琴 
 */

import Component from './component';

export default class SinglePic extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.props;

        return `<div class="item single-pic">
                    <div class="content">
                        <span class="line3" y-on:click="clicking">
                            ${data.title}
                        </span>
                    </div>
                    <img src="${data.imageList[0]}" />
                </div>`;
    }

}