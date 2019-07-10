var express = require('express');
var router = express.Router();

var model = require('../model/DBBoard');
var DB = require('../model/DBchat');

router.get('/', function(req, res){
    console.log('게시판');
    DB.chatList({query : {}, callback: function(docs){
        chat = docs;
    }});
    model.BoardList({query : {}, callback: function(docs){
        res.render('chat.ejs', {
            list: docs,
            chat: chat
        });
    }});
});

router.post('/', function(req, res){
    console.log('댓글 작성');
    var dt = new Date();
    var d = dt.toFormat('YYYY-MM-DD HH24:MI:SS');
    var paramID = 'GSM';
    var paramChat = req.body.chat || req.query.chat;
    console.log('paramID : ' + paramID + ', paramChat : ' + paramChat + ', DateTime : ' + d);
    if(paramID  && paramChat){
        console.log('댓글 작성 시도');
        DB.addchat(paramID, paramChat, d, function(err, result){
            if(err){
                console.log('Error!!!');
                res.writeHead(200, { "Content-Type": 'text/html; charset=utf-8'});
                res.write('<h1>에러발생</h1>');
                res.end();
                return;
            }if(result){
                console.dir('성공');
                res.redirect('chat');
            }else{
                console.log('추가 안됨 Error!!!');
                res.writeHead(200, { "Content-Type": 'text/html; charset=utf-8'});
                res.write('<h1>댓글 작성 실패</h1>');
                res.write('<a href="/chat"> 뒤로가기</a>');
                res.end();
            }
        });
    }else{
        console.log('댓글이 없음');
        res.writeHead(200, { "Content-Type": 'text/html; charset=utf-8'});
        res.write('<h1>빈칸을 채워주세요</h1>');
        res.write('<a href="/chat"> 다시하기</a>');
        res.end();
    }
});

module.exports = router;