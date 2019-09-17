const fs = require('fs');
const http = require('http');

var server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        res.end();
        return;
    }
    if(req.url === '/list') {
        fs.readFile('./list.json', {encoding: "utf-8"}, (err, content) => {
            if(err) {
                throw new Error(err);
            }
            // var jsonObj = JSON.parse(content);
            res.setHeader('Content-Type', 'text/html;charset=utf-8');
            res.write(content);
            res.end();
        })
    }
})

server.listen(8000, () => {
    console.log('服务器已启动，请访问http://localhost:8000')
});