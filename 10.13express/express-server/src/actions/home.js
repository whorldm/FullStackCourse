/**
 * @file home logic
 * @author caoyaqin
 */
const apis = require('../utils/apis');
const utils = require('../utils/utils');
const Page = require('./page');

module.exports = class Home extends Page {

    constructor() {
        super();
    }

    init(app) {
        app.get('/home', (req, res) => {
            console.log('I got home');

            // render的第二个参数是向模板注入的数据
            // res.render('index', {
            //     listData: {},
            //     content: '内容'
            // });

            this.render(req, res);
        });
    }

    render(req, res) {
        this.renderListPage(req, res);
    }
}