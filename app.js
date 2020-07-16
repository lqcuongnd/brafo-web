var express = require('express')
var app = express()

const { resolve } = require('path')
require('dotenv').config({ path: resolve("../.env") })
var port = 2902
var store = require('store')
let user
const userRoute = require('./routes/taikhoan')
const roomRoute = require('./routes/phong')
const csvcRoute = require('./routes/csvc')
const loiRoute = require('./routes/loi')
const trangthaiRoute = require('./routes/trangthai')
const baocaoRoute = require('./routes/baocao')
const dangnhapRoute = require('./routes/dangnhap')
var database = require('./my_modules/db')
var session = require('express-session')
let cookieParser = require('cookie-parser'); 
global.user = null
global.link = null

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs')
// Thư mục views nằm cùng cấp với file app.js
app.set('views', './views')
app.use(express.static('public'))
//app.use(cookieParser())
//NẠP CÁC ROUTER TRONG THƯ MỤC ROUTES
// Dùng userRoute cho tất cả các route bắt đầu bằng '/taikhoan'
app.use('/taikhoan', userRoute)
app.use('/phong', roomRoute)
app.use('/csvc', csvcRoute)
app.use('/loi', loiRoute)
app.use('/trangthai', trangthaiRoute)
app.use('/baocao', baocaoRoute)
app.use('/dangnhap', dangnhapRoute)

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser())

app.get('/', async (req, res) => {
    console.log("GET: HOME")
    
    if(req.cookies.auth != undefined){
        let user = req.cookies.auth.user
        res.render('pages/index', { user: user })
    }
    else{
        console.log('Chưa đăng nhập, chuyển hướng trang đăng nhập')
        res.redirect('/dangnhap')
    }

})

app.get('/dangxuat', (req, res) => {
    user = null
    res.redirect('/dangnhap')
})

// app.listen(process.env.PORT || port, function() {
//     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env)
// })
app.listen(port, function () {
    console.log("Express server listening on port %d in %s mode", port, app.settings.env)
})

app.get('/test', (req, res) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
    let t = fullUrl
    console.log(t)
})