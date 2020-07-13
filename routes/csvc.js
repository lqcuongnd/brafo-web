// route for cơ sở vật chất here

var express = require('express');
var csvcRouter = express.Router();

const { resolve } = require('path')
require('dotenv').config({ path: resolve("../.env") })
let rootUrl = '' + process.env.HOST + process.env.PORT

//MẶC ĐỊNH ROUTE ĐÃ LÀ /phong RỒI

csvcRouter.get('/', function(req, res, next) {
    console.log('Enter router csvc');
    res.render('csvc/quanlycsvc');
});

csvcRouter.get('/themcsvc', function(req, res, next) {
    console.log('Enter thêm cơ sở vật chất');
    res.render('csvc/themcsvc');
});

module.exports = csvcRouter;