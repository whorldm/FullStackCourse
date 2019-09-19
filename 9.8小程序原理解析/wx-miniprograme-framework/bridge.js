/**
 * @file 小程序核心逻辑层 - 处理视图层与逻辑层之间通信
 * @author caoyaqin
 */
class Bridge {
	/**
	 * 创建视图即webview，使用iframe模拟实现webview
	 * @param {String} id - 视图的唯一标识 
	 */
	createView(id) {
		return new Promise(resolve => {
			let frame = document.createElement('iframe');
			frame.src = './view.html';
			frame.id = id;
			frame.onload = () => resolve(frame);
			document.body.appendChild(frame);
		});
	}

	/**
	 * 逻辑层向视图层发消息
	 * @param {String} id - 视图的唯一标识
	 * @param {Object} params - 需要set的数据
	 */
	postMessage(id, params) {
		const target = document.querySelector('#' + id);
		target.contentWindow.postMessage(params);
	}
	
	/**
	 * 监听收到的消息
	 * @param {Function} callback - 收到消息后的回调函数
	 */
	onMessage(callback) {
		window.addEventListener('message', function (event) {
			callback && callback(event.data);
		});
	}
}

window.__bridge = new Bridge();