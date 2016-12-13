var express = require('express');
var router = express.Router();
router.get('/logout', function(req, res, next) {
	req.session.error=null;
	req.session.user=null;
	res.redirect('/');
});
module.exports = router;