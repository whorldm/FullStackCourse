var http = require('http');
var fs = require('fs');
var path = require('path');
const rootDir = `/Users/caoyq/Desktop/课程资料/day14/wx-miniprograme-framework/`;
 
var app = http.createServer((req, res) => {
    const filePath = path.resolve(rootDir + req.url);
    console.log('filePath:', filePath)
    fs.readFile(filePath, 'utf-8', (err, content) => {
        if(err) {
            res.write('err', err);
            res.end();
            return;
        }
        res.write(content);
        res.end();
    });
})
app.listen(9000);
 
console.log('服务启动了~');