/**
 * @file fake the express
 * @author caoyaqin
 */
const http = require('http');

class Layer {
    constructor(route, handle) {
        this.route = route;
        this.handler = handle;
    }

    match(path) {
        if (this.route) {
            return this.route.pathRegx.exec(path);
        }
        return true;
    }

    handle(req, res, next) {
        if (this.route) {
            next();
            this.handler && this.handler(req, res);
            return;
        }
        this.handler && this.handler(req, res, next);
    }
}

class Route {
    constructor(pathRegx) {
        this.pathRegx = pathRegx;
        this.stack = [];
    }
    
    pushLayer(layer) {
        this.stack.push(layer);
    }
}

class Router {
    constructor() {
        this.stack = [];
    }

    use(fn) {
        const layer = new Layer(null, fn);
        this.stack.push(layer);
    }

    route(path, fn) {
        const route = new Route(path);
        const layer = new Layer(route, fn);
        this.stack.push(layer);
    }

    handle(req, res) {
        const path = req.url;
        let idx = 0;
        const next = () => {
            let layer = null;
            let match = false;
            while (match !== true && idx < this.stack.length) {
                layer = this.stack[idx++];
                match = layer.match(path);
            }
            layer && layer.handle(req, res, next);
        };

        next();
    }
}

// 中间件
const applyCookie = function (req, res, next) {
    const cookieStr = req.headers.cookie || '';
    const cookieRegx = /([^\=\s]*)=([^\;]*)(;|$)/g;
    let cookieInfo = null;
    const cookies = {};
    while ((cookieInfo = cookieRegx.exec(cookieStr))) {
        cookies[cookieInfo[1]] = cookieInfo[2];
    }
    req.cookies = cookies;
    next();
};

const applySend = function (req, res, next) {
    res.send = (raw) => {
        res.write(raw);
        res.end();
    };
    next();
};

class Application {
    constructor() {
        this.router = new Router();
        this.router.use(applyCookie);
        this.router.use(applySend);
    }

    handle(req, res) {
        return this.router.handle(req, res);
    }

    get(pathRegx, fn) {
        this.router.route(pathRegx, fn);
    }

    post(pathRegx, fn) {
        this.router.route(pathRegx, fn);
    }

    listen(port) {
        const server = http.createServer(this.handle.bind(this));
        return server.listen(port);
    }
}

function createApplication () {
    let instance;
    if(!instance) {
        instance = new Application();
    }
    return instance;
}

module.exports = createApplication;