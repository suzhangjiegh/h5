var express = require('express');
var router = express.Router();

router.get('/cart',function (req, res) {
	if (!req.session.user) {
		req.session.error="用户已过期，请重新登录";
 		res.redirect('/login');

 	}else{
 		var Cart =global.dbHelper.getModel('cart');
 		Cart.find({"uId":req.session.user._id,"cStatus":false}, function (error, docs) { 
            res.render('cart',{carts:docs});
            console.log("carts="+docs);
        });	
 	}
});

router.get('/cart/addToCart/:id',function (req, res) {
	console.log("添加商品=addToCart");
	if (!req.session.user) {
		req.session.error="用户已过期，请重新登录";
 		res.redirect('/login');
 	}else{
 		var Commodity =global.dbHelper.getModel('commodity');
 		var Cart =global.dbHelper.getModel('cart');
 		Cart.findOne({"uId":req.session.user._id,"cId":req.params.id}, function (error, docs) {
            if (docs) {
            	console.log("添加商品="+docs);
            	Cart.update({"uId":req.session.user._id,"cId":req.params.id},{$set:{"cQuantity":docs.cQuantity+1}},function(error,docs) {
            		if (docs>0) {
            			console.log("添加商品=updata");
            			res.redirect('/home');
            		}
            	});
            }else{

                /*没有商品就需要给他添加个uid*/
            	Commodity.findOne({"_id":req.params.id},function (error,docs) {
            		if (docs) {
            			console.log("添加商品=create钱"+req.params.id);
            			Cart.create({
            				uId:req.session.user._id,
            				cId:req.params.id,
            				cName: docs.name,
                            cPrice: docs.price,
                            cImgSrc: docs.imgSrc,
                            cQuantity : 1

            			},function (error,docs) {
            				if(docs){
            					console.log("添加商品=create");
            					res.redirect('/home');
            				}
            			});
            		}
            	});
            }
        });	
 	}
});

router.get("/delFromCart/:id",function (req, res) {
    console.log("delFromCart");
    var Cart = global.dbHelper.getModel('cart');
    Cart.remove({"_id":req.params.id},function(error,doc){
            console.log("delFromCart ="+doc);
        if(doc!=null){
            res.redirect('/cart');
        }
    });
});

//购物车结算
router.post("/clearing",function(req,res){
    console.log("购物车结算");
    var Cart = global.dbHelper.getModel('cart');
    Cart.update({"_id":req.body.cid},{$set : { cQuantity : req.body.cnum,cStatus:true }},function(error,doc){
        console.log("clearing ="+doc);
        if(doc > 0){
            res.send(200);
        }
    });
});

module.exports = router;