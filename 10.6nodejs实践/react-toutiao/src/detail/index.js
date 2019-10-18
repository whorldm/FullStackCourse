import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// class Content extends Component {
// 	render() {
// 		console.log('渲染啦!', location.href);
// 		return (<div>详情页面</div>);
// 	}
// }

// const ContentView = withRouter(connect(
// 	state => {
// 		return {
// 			list: state.list
// 		};
// 	}
// )(Content));

// export default class Detail extends Component {
// 	render() {
// 		return (
//             <div>
// 				<ContentView />
// 				<Link to={"/detail/i672763421225964391" + Math.random() * 10}>跳转内容</Link>
// 				我是详情页，我的id是：{this.props.match.params.id}
//             </div>
//         );
// 	}
// }

export default class Detail extends Component {
	render() {
		return (<div>详情页面</div>);
	}
}