var express = require('express');
var router = express.Router();

var model = require('../model/DB');

router.get('/', function(req, res){
    res.render('main');
});

module.exports = router;