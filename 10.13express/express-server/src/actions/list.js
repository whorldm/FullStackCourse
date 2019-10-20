/**
 * @file list logic
 * @author caoyaqin
 */
const apis = require('../utils/apis');

module.exports = class List {

    init(app) {
        app.get('/list', (req, res) => {
            apis.getList()
                .then(content => {
                    const listObj = apis.convert(content);
                    res.send(JSON.stringify(listObj));
                });
        });
    }
}