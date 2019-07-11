var express = require('express');
var router = express.Router();

var model = require('../model/DBBoard');
var DB = require('../model/DBcomment');

var Num;

router.get('/', function(req, res){
    console.log('게시판');
    Num = req.body.number || req.query.number;
    console.log('Number : ' + Num);
    DB.CommentList({query : {}, callback: function(docs){
        comment = docs;
    }});
    model.BoardList({query : {}, callback: function(docs){
        res.render('viewboard.ejs', {
            list: docs,
            session : req.session.user,
            comment: comment,
            Num: Num,
            id : req.session.user.name
        });
    }});
});

router.post('/', function(req, res){
    console.log('댓글 작성');
    var dt = new Date();
    var d = dt.toFormat('YYYY-MM-DD HH24:MI:SS');
    var paramID = req.session.user.name || req.body.name || req.query.name;
    var paramComment = req.body.comment || req.query.comment;
    console.log('paramID : ' + paramID + ', paramComment : ' + paramComment + ', DateTime : ' + d + ', Num : ' + Num);
    if(paramID  && paramComment){
        console.log('댓글 작성 시도');
        DB.addComment(Num, paramID, paramComment, d, function(err, result){
            if(err){
                console.log('Error!!!');
                res.writeHead(200, { "Content-Type": 'text/html; charset=utf-8'});
                res.write('<h1>에러발생</h1>');
                res.end();
                return;
            }if(result){
                console.dir('성공');
                res.redirect('viewboard?number='+Num+'');
            }
        });
    }
});

module.exports = router;