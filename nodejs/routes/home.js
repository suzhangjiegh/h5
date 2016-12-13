var express = require('express');
var router = express.Router();

router.get('/home', function(req, res, next) {
 	if (req.session.user) {
 		var Commodity=global.dbHelper.getModel('commodity');
 		Commodity.find({},function (err,doc) {
 			console.log("商品="+doc);
 			res.render('home',{Commoditys:doc});
 		});
 	}else{
 		req.session.error="请先登录";
 		/*返回到登录界面*/
 		res.redirect('/login');
 	}
});





module.exports = router;