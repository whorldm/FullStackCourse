const http = require('http');
const apis = require('./apis');
const utils = require('./utils');


const TEMPLATE_ROOT_DIR = "../dist/html/";
const STATIC_DIR = "../dist/static/";
const IS_PEAK_PERIOD = false;  // 是否为用户访问高峰期, 高峰期时不使用SSR渲染


var cache = utils.createCacher(5 * 1000 * 1000);


var actionMap = [
    {
        uri: /^\/home/,
        handle: (req, res) => {
            const cacheStr = cache(TEMPLATE_ROOT_DIR, '/index.html');
            if(cacheStr) {
                res.write(cacheStr);
                res.end();
            }

            utils.readContent(TEMPLATE_ROOT_DIR + '/index.html')
                .then(content => {
                    if(!IS_PEAK_PERIOD) {
                        apis.getList().then(listStr => {
                            const listObj = apis.convert(listStr);
                            const reactTemplete = utils.renderSSR({
                                list: listObj.data
                            });
                            content = content
                                .replace('{%content%}', reactTemplete)
                                .replace('{%listData%}', JSON.stringify({
                                    list: listObj.data
                                }));
                            cache(TEMPLATE_ROOT_DIR, '/index.html', content);
                            res.write(content);
                            res.end();
                        });
                    } else {
                        apis.getList().then(listStr => {
                            const listObj = apis.convert(listStr);
                            content = content
                                .replace('{%listData%}', JSON.stringify({
                                    list: listObj.data
                                }));
                            cache(TEMPLATE_ROOT_DIR, '/index.html', content);
                            res.write(content);
                            res.end();
                        })
                    }
                })
        }
    }, {
        uri: /^\/static/,
        handle: (req, res) => {
            var filepath = req.url.replace(/^\/static/, '').replace(/\?.*$/, '');
            utils.readContent(STATIC_DIR + filePath)
                .then(content => {
                    res.write(content);
                    res.end();
                });
        }
    }, {
        uri: /^\/list\/?$/,
        handle: (req, res) => {
            apis.getList()
                .then(content => {
                    const listObj = apis.convert(content);
                    res.write(JSON.stringify(listObj));
                    res.end();
                });
        }
    }
];

function init () {
    const server = http.createServer((req, res) => {
        const actions = actionMap.filter(item => item.uri.exec(req.url));
        actions.forEach(action => actions.handle(req, res));
    });

    server.listen(9000, () => {
        console.log('已启动监听');
    });
}

module.exports = {
    init: init
}