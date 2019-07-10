var express = require('express');
var router = express.Router();

var model = require('../model/DBBoard');

var Num;

router.get('/', function(req, res){ 
    Num = req.body.number || req.query.number;
    console.log('Number : ' + Num);
    model.BoardList({query : {}, callback: function(docs){
        res.render('board.ejs', {
            list: docs,
            session : req.session.user,
            Num: Num
        });
    }});
});

module.exports = router;