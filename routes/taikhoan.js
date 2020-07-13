// route for user here

var express = require('express');
var database = require('../my_modules/db');
var userRouter = express.Router();
var bodyParser = require('body-parser');

const { resolve } = require('path')
require('dotenv').config({ path: resolve("../.env") })
let rootUrl = '' + process.env.HOST + process.env.PORT

userRouter.use(bodyParser.urlencoded({ extended: false }))
    //userRouter.use(bodyParser());

userRouter.use(function(req, res, next) {
    res.locals.userValue = null;
    next();
})

//MẶC ĐỊNH ROUTE ĐÃ LÀ /taikhoan RỒI

userRouter.get('/', async function(req, res, next) {
    if (user == null) {
        link = '/taikhoan';
        res.redirect('/dangnhap');
    } else {
        console.log('Enter taikhoan ... ');

        let users = await database.getAllUsers();
        let list = [];
        users.forEach(doc => {
            list.push(doc);
        });

        // function editUser() {
        //     console.log('sua user')
        // };

        //let num = await database.countUsers();
        console.log(list.length);

        res.render('taikhoan/quanlytaikhoan', { userList: list });
    }
});

userRouter.post('/suataikhoan', async function(req, res, next) {
    if (user == null) {
        link = '/taikhoan';
        res.redirect('/dangnhap');
    } else {
        let u = req.body.TenDN;
        console.log('\POST sửa tài khoản...' + u);
        let kh = req.body.KichHoat == "on" ? true : false;
        let gt = req.body.GioiTinh == "true" ? true : false;

        let data = {
            TenDN: req.body.TenDN,
            Ten: req.body.Ten,
            Id: req.body.Id,
            MatKhau: req.body.MatKhau,
            GioiTinh: gt,
            Loai: req.body.Loai,
            KichHoat: kh,
        };

        await database.editUser(u, data);

        res.redirect('/taikhoan');
    }
})

userRouter.post('/themtaikhoan', async function(req, res, next) {
    if (user == null) {
        link = '/taikhoan';
        res.redirect('/dangnhap');
    } else {
        let u = req.body.TenDN;
        console.log('\POST thêm tài khoản...' + u);
        let kh = req.body.KichHoat == "on" ? true : false;
        let gt = req.body.GioiTinh == "true" ? true : false;

        let data = {
            TenDN: req.body.TenDN,
            Ten: req.body.Ten,
            Id: req.body.Id,
            MatKhau: req.body.MatKhau,
            GioiTinh: gt,
            Loai: req.body.Loai,
            KichHoat: kh,
        };

        let add = await database.addUser(u, data);

        res.redirect('/taikhoan');
    }
});

module.exports = userRouter;