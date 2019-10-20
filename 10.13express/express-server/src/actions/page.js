module.exports = class {

    model(modelName) {
        const ModelClass = require('../' + modelName.toLowerCase());
        return ModelClass;
    }
 
    renderListPage() {
        
    }
}