/**
 * @file ations manager
 * @author caoyaqin
 */

const Home = require('./home');
const List = require('./list');
const Login = require('./login');

// 行为管理中心
module.exports = class Actions {
    init(app) {
        (new Home()).init(app);
        (new List()).init(app);
        (new Login()).init(app)
    }
}