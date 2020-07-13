var express = require('express')
var app = express()
var port = 4000;
//var cookieParser = require('cookie-parser')
const userRoute = require('./routes/taikhoan')
const roomRoute = require('./routes/phong')
const csvcRoute = require('./routes/csvc')
const loiRoute = require('./routes/loi')
const trangthaiRoute = require('./routes/trangthai')
const baocaoRoute = require('./routes/baocao')
const dangnhapRoute = require('./routes/dangnhap')
var database = require('./my_modules/db')
var session = require('express-session')
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
app.use(session({
    secret: 'This is a secret',
    resave: false,
    saveUninitialized: true
}))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const { resolve } = require('path')
require('dotenv').config({ path: resolve("../.env") })
let rootUrl = '' + process.env.HOST + process.env.PORT

app.get('/', async function (req, res) {
    console.log("Home ")

    if (user != null) {
        console.log('DA DANG NHAP ' + user.get('Ten'))
        res.render('pages/index', { u: user, db: database })
    } else {
        console.log('CHUA DANG NHAP ' + user)
        link = '/'
        res.redirect('/dangnhap')
    }


})

app.get('/dangxuat', (req, res) => {
    user = null
    res.redirect('localhost:' + port + '/dangnhap')
})

// app.listen(process.env.PORT || port, function() {
//     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env)
// })
app.listen(port, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env)
})

app.get('/test', (req, res) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
    let t = fullUrl
    console.log(t)
})