/**
 * @file 管理全局的入口文件
 * @author yuanxin
 */
import * as utils from './utils';
import components from './items';

const THRESHOLD = 50;

class Manager {

	constructor($container) {
		this.$container = $container;
	}

	init() {
		this.appendData();
		this.detectReachBottom(() => this.appendData());
	}

	getData() {
		return new Promise((resolve, reject) => {
			utils.request({
				url: 'http://127.0.0.1:8099/list'
			})
			.then(res => {
				localStorage.setItem('newsData', JSON.stringify(res));
				resolve(res);
			})
			.catch(err => {
				resolve(JSON.parse(localStorage.getItem('newsData') || '{}'));
			});
		})
		
	}

	appendData() {
		this.getData().then(res => {
			const items = res.data;
			items.forEach(item => {
				const componentName = item.type
					.replace(/^\w/g, w => w.toUpperCase());
				const Component = components[componentName];
				const currentComponent = new Component(item);
				const element = currentComponent.constructElement();
				this.$container.append(element);
			});
			localStorage.setItem('newsData','');
		})
	}

	detectReachBottom(callback = () => { }) {

		window.onscroll = () => {
			const offsetHeight = document.documentElement.offsetHeight;
			const screenHeight = window.screen.height;
			const scrollY = window.scrollY;
			const gap = offsetHeight - screenHeight - scrollY;
			if (gap < THRESHOLD) {
				callback();
			}
		};

	}

	static getInstance($container) {
		return new Manager($container);
	}

}

const $container = document.getElementById('container');
const manager = Manager.getInstance($container);

manager.init();