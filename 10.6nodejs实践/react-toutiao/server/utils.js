var React = require('react');
const fs = require('fs');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const App = require('../src-es5/app').default;
const createStore = require('../src-es5/store').default;
const { Provider } = require('react-redux');

// 读取文件
function readContent(ROOT_DIR, path) {
    return new Promise((resolve, reject) => {
        fs.readFile(ROOT_DIR + path, 'utf-8', (err, content) => {
            if(err) {
                reject(err);
            }
            resolve(content);
        });
    });
}

// 服务器端渲染
function renderSSR(storeData) {
    const htmlStr = renderToString(
        React.createElement(
            StaticRouter,
            {
                location: "/home",
                context: {}
            },
            React.createElement(
                Provider,
                {
                    store: createStore(storeData)
                },
                React.createElement(App)
            )
        )
    );
    return htmlStr;
}

// 创建缓存池
function createCacher(MAX_SIZE) {
    var cacheMap = {};
    var usedSize = 0;
    return function cache(key, value) {
        if(!value) {
            return cacheMap[key];
        }
        const contentSize = value.length;
        if(usedSize + contentSize < MAX_SIZE) {
            cacheMap[key] = value;
            usedSize += contentSize;
        }
    }
}

module.exports = {
    renderSSR: renderSSR,
    readContent: readContent,
    createCacher: createCacher
}