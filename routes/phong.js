// route for room here

var express = require('express');
var roomRouter = express.Router();

//MẶC ĐỊNH ROUTE ĐÃ LÀ /phong RỒI

roomRouter.get('/', function(req, res, next) {
    if (user == null) {
        res.redirect('/dangnhap');
    } else {
        console.log('Enter router phong');
        res.render('phong/quanlyphong');
    }
});

roomRouter.get('/themphong', function(req, res, next) {
    if (user == null) {
        res.redirect('/dangnhap');
    } else {
        console.log('Enter thêm phòng');
        res.render('phong/themphong');
    }
});

module.exports = roomRouter;