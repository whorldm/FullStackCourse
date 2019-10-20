/**
 * @file login logic
 * @author caoyaqin
 */
const apis = require('../utils/apis');
const utils = require('../utils/utils');
const Page = require('./page');

module.exports = class Login extends Page {

    init(app) {
        app.get('/login', (req, res) => this.render(req, res));
        this.login(app);
    }

    render(req, res) {
        this.renderListPage(req, res);
    }

    login() {
        app.post('/data/login', (req,res) => {
            this.dao.getCacher().set('user_1', JSON.stringify({
                username: 'caoyaqin',
                password: '123456'
            })).then(res => {
                this.dao.getCacher().get('user_1')
                    .then(res => {
                        console.log('user_1 is', res)
                    })
            });
            const { username, password } = req.body;
            const User = this.model('User');

        })
    }
}