const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const server = require('./server');

if(cluster.isMaster) {
    for(let i=0; i<numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, singal) => {
        console.log(`工作进程${worker.process.pid}已退出`);
    });
} else {
    server.init();
}