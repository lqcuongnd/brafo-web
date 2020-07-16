// route for user here

var express = require('express');
var database = require('../my_modules/db');
var userRouter = express.Router();
var bodyParser = require('body-parser');
let apis = require('../my_modules/apis')

let cookieParser = require('cookie-parser')

const { resolve } = require('path')
require('dotenv').config({ path: resolve("../.env") })
let rootUrl = '' + process.env.HOST + process.env.PORT

var store = require('store')
let user

userRouter.use(bodyParser.urlencoded({ extended: false }))
    //userRouter.use(bodyParser());

userRouter.use(function(req, res, next) {
    res.locals.userValue = null;
    next();
})
userRouter.use(cookieParser())

//MẶC ĐỊNH ROUTE ĐÃ LÀ /taikhoan RỒI

userRouter.get('/', async function(req, res, next) {

    console.log("GET: TAI KHOAN")

    if(req.cookies.auth != undefined){

        let user = req.cookies.auth.user

        let jwt = req.cookies.auth.jwt
    
        res.render('taikhoan/quanlytaikhoan', { user: user })
    }
    else{
        console.log('chưa đăng nhập')
        res.render('pages/login')
    }
})

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