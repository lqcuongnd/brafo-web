// route for user here

var express = require('express');
var database = require('../my_modules/db');
var loginRouter = express.Router();
var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
var session = require('express-session');

const { resolve } = require('path')
require('dotenv').config({ path: resolve("../.env") })
let rootUrl = '' + process.env.HOST + process.env.PORT

loginRouter.use(bodyParser.urlencoded({ extended: false }))
    //loginRouter.use(express.cookieParser());
loginRouter.use(session({
    secret: 'This is a secret',
    resave: false,
    saveUninitialized: true
}));

loginRouter.use(function(req, res, next) {
    res.locals.userValue = null;
    next();
})

//MẶC ĐỊNH ROUTE ĐÃ LÀ /taikhoan RỒI

loginRouter.get('/', (req, res) => {
    console.log("GET DangNhap");
    res.render('pages/login');
})

loginRouter.post('/', async function(req, res, next) {
    console.log("POST DangNhap");
    let username = req.body.username;
    let pass = req.body.pass;

    let check = await database.getAmin(username);

    if (check == false) {
        res.redirect('/dangnhap');
    } else if (pass == check.get('MatKhau')) {
        user = check;
        console.log('sesion ' + user + ' dang nhap thanh cong, chuyen sang home ...');
        if (link != '' && link != '/')
            res.redirect('/');
        else
            res.redirect(link);
    } else {}

})

module.exports = loginRouter;