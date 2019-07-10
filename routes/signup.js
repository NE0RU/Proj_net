var express = require('express');
var router = express.Router();

var model = require('../model/DB');

router.get('/', function(req, res){
    model.signup({query : {}, callback: function(docs){
        res.render('signup', {list: docs});
    }});
});

router.post('/', function(req, res){
    if(req.body.id && req.body.pw && req.body.name){
        model.insertmember(req.body);
    }
    res.redirect('/');
});

module.exports = router;