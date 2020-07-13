// route for loi here

var express = require('express');
var loiRouter = express.Router();

//MẶC ĐỊNH ROUTE ĐÃ LÀ /taikhoan RỒI

loiRouter.get('/', function(req, res, next) {
    console.log('Enter router lỗi');
    res.render('loi/quanlyloi');
});

loiRouter.get('/themloi', function(req, res, next) {
    console.log('Enter thêm lỗi');
    res.render('loi/themloi');
});

module.exports = loiRouter;