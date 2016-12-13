module.exports = function(app){
	//路由配置
    console.log('-----路由配置--------')
    app.use('/', require("./login"));
    app.use('/', require("./register"));
    app.use('/', require("./home"));
    app.use('/', require("./logout"));
    app.use('/', require("./addcommodity"));
    app.use('/', require("./cart"));
}
