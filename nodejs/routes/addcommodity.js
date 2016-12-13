var express = require('express');
var router = express.Router();

router.get('/addcommodity',function (req, res) {
	if (req.session.user) {
 		 res.render('addcommodity');	
 	}else{
 		req.session.error="请先登录";
 		res.redirect('/login');
 	}
});

router.post('/addcommodity',function (req, res) {
	if (req.session.user) {
 		var Commodity = global.dbHelper.getModel('commodity');

        Commodity.findOne({name:req.body.name},function (error,doc) {
            if (error) {
                res.send(500);
                console.log(error);
            } else if (doc) {
                res.send(500);
            } else {
                Commodity.create({
                    name: req.body.name,
                    price: req.body.price,
                    imgSrc: req.body.imgSrc
                }, function (error, doc) {
                    if (doc) {
                        res.send(200);
                    }else{
                        console.log("添加商品错误="+error);
                        res.send(404);
                    }
                }); 
            }
        });

       
 	}else{
 		req.session.error="请先登录";
 		res.redirect('/login');
 	}
});
module.exports = router;