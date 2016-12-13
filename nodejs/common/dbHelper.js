var mongoose = require('mongoose');
var models = require('./models');
var Schema = mongoose.Schema;


/*创建模型并集合关联*/
for (var m in models) {
    mongoose.model(m, new Schema(models[m]));
}
module.exports = {
    getModel: function (type) {
        return _getModel(type);
    }
};

var _getModel = function (type) {
    return mongoose.model(type);
};

