/**
 * @file 所有模板文件的基类
 * @author 曹雅琴
 */

export default class Component {

	constructor(props) {
		this.props = props;
	}

	render() {
		return '<div>我是基类，不要直接使用我</div>';
	}

	constructElement() {
		const html = this.render();
		const $content = document.createElement('div');
		const $container = document.createElement('div');
		$container.appendChild($content);
		$content.outerHTML = html;
		this.el = $container.firstChild;
		return this.el;
	}

}