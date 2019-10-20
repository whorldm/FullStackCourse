var http = require('http');
var https = require('https');
var fs = require('fs');


var TEMPLATE_ROOT_PATH = '../dist/html/';
var STATIC_DIR = '../dist';

function renderContent(ROOT_DIR, path) {
    return new Promise((resolve, reject) => {
        fs.readFile(ROOT_DIR + path, 'utf-8', (err, content) => {
            if(err) {
                reject(err);
            }
            resolve(content);
        });
    });
}

var actionMap = [
    {
        uri: /^\/home/,
        handle: function(req, res) {
            // 获取并渲染了html字符串
            renderContent(TEMPLATE_ROOT_PATH, '/index.html')
                .then(content => {
                    res.write(content);
                    res.end();
                });
        }
    }, {
        uri: /^\/static/,
        handle: function(req, res) {
            // 从path上，获取一下静态文件的路径
            var filePath = req.url.replace(/^\static/, '').replace(/\?.*$/, '');
            renderContent(STATIC_DIR, filePath)
                .then(content => {
                    res.write(content);
                    res.end();
                });
        }
    }, {
        uri: /^\/list/,
        handle: function(req, res) {
            https.get(
                'https://m.toutiao.com/list/?tag=news_society&ac=wap&count=20&format=json_raw&as=A1253DCA7C73695',
                function(list) {
                    var body = "";
                    list.
                    on('data', chunk => {
                        body += chunk;
                    })
                    .on('end', () => {
                        var bodyObj = JSON.parse(body);
                        res.write(JSON.stringify({
                            data: [
                                {
                                    "type": "singlePic",
                                    "data": {
                                        "articleUrl": bodyObj.data[0].articleUrl,
                                        "title": bodyObj.data[0].title,
                                        "id": "i67276898394837578",
                                        "articleType": "video",
                                        "imageList": [
                                            bodyObj.data[0].image_url
                                        ]
                                    }
                                }
                            ]
                        }));
                        res.end();
                    })
                });
        }
    }
];

var server = http.createServer((req, res) => {
    // 收到请求 RPC
    const actions = actionMap.filter(({uri}) => uri.exec(req.url));
    actions.forEach(action => action.handle(req, res));
});

server.listen(9000, () => {
    console.log('已启动监听')
});