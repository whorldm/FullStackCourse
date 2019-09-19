/**
 * @file 大图的组件
 * @author 曹雅琴 
 */

import Component from "./component";

export default class BigPic extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.props;

        return `<div class="item big-pic">
                    <p class="line3" y-on:click="clicking">
                        ${data.title}
                    </p>
                    <img src="${data.imageList[0]}" />
                </div>`;
    }
}