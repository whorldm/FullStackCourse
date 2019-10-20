/**
 * @file entry root of toutiao server
 * @author caoyaqin
 */

const express = require('express');
const ejs = require('ejs');
const config = require('./config');
const Actions = require('./actions');
const bodyParser = require('body-parser');

/**
 * 1. 处理同步请求并渲染模板
 * 2. 处理JSON并返回JSON串
 * 3. 做一个静态服务
 */

/**
 * init the program
 */
function init () {

    const app = express();

    // app.engine('html', ejs.__express);
    // 设置ejs作为模板引擎
    app.set('view engine', 'ejs');
    app.set('views', config.view.path);
    app.use('/static', express.static(config.view.staticPath));
    app.use(bodyParser);

    // 初始化所有的actions
    (new Actions()).init(app);

    app.listen(9000, () => {
        console.log('已启动监听')
    });
}

init();