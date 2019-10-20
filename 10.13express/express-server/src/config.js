/**
 * @file 配置文件--配置引用文件的路径
 * @author caoyaqin
 */

const path = require('path');
module.exports = {
    view: {
        path: path.resolve(__dirname + '模板文件路径'),
        staticCompiledPath: path.resolve(__dirname + '静态编译路径'),
        staticPath: path.resolve(__dirname + '')
    }
}