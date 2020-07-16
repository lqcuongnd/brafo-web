// route for user here

var express = require('express')
var database = require('../my_modules/db')
let apis = require('../my_modules/apis')
var loginRouter = express.Router()
var bodyParser = require('body-parser')
var session = require('express-session')
let cookieParser = require('cookie-parser'); 

let link

const { resolve } = require('path')
require('dotenv').config({ path: resolve("../.env") })

var store = require('store')

loginRouter.use(bodyParser.urlencoded({ extended: false }))
//loginRouter.use(express.cookieParser())
// loginRouter.use(session({
//     secret: 'This is a secret',
//     resave: false,
//     saveUninitialized: true
// }))
loginRouter.use(cookieParser())

loginRouter.use(function (req, res, next) {
    res.locals.userValue = null
    next()
})

loginRouter.get('/', async (req, res) => {
    console.log('GET DANG NHAP')

    if(req.cookies.auth != undefined){
        console.log('jwt nè: ' + req.cookies.jwt)
        res.redirect('/')
    }
    else{
        console.log('chưa đăng nhập')
        res.render('pages/login')
    }
})

loginRouter.post('/', async function (req, res, next) {
    console.log("POST: DANG NHAP")
    let username = req.body.username
    let pass = req.body.pass

    let auth = await apis.auth(username, pass)

    console.log(auth)
    if (typeof(auth) != undefined) {
        if (auth.hasOwnProperty('jwt')) {
            res.cookie('auth', auth)
            res.cookie('jwt', auth.jwt)

            // let role = res.cookie('auth', auth).user.role.type;
            // if (role != 'admin') {
            //     res.redirect('/dangnhap')
            // }

            console.log(auth.user.username)
            console.log('sesion ' + user + ' dang nhap thanh cong, chuyen sang home ...')
            if (link != '' && link != '/')
                res.redirect('/')
            else
                res.redirect(link)
        }
    }
    else {
        res.redirect('/dangnhap')
    }

})

module.exports = loginRouter