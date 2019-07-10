var express = require('express');
var router = express.Router();

var model = require('../model/DBBoard');

router.get('/', function(req, res, next) {
  res.render('addboard.ejs', {
    session : req.session.user,
    id : req.session.user.name
  });
});

router.post('/', function(req, res){
    console.log('게시물 작성');
    var dt = new Date();
    var d = dt.toFormat('YYYY-MM-DD HH24:MI:SS');
    var paramID = req.session.user.name || req.body.name || req.query.name;
    var paramTitle = req.body.title || req.query.Title;
    var paramContent = req.body.content || req.query.content;
    console.log('paramID : ' + paramID + ', paramTitle : ' + paramTitle + ', paramContent : ' + paramContent + ', DateTime : ' + d);
    if(paramID  && paramTitle && paramContent){
        console.log('게시물 작성 시도');
        model.addboard(paramID, paramTitle, paramContent, d, function(err, result){
            if(err){
                console.log('Error!!!');
                res.redirect('boardfail');
                return;
            }if(result){
                console.dir('성공');
                res.redirect('board?number=1');
            }else{
                console.log('추가 안됨 Error!!!');
                res.redirect('boardfail');
            }
        });
    }else{
        console.log('게시글이 없음');
        res.redirect('boardfail');
    }
});

module.exports = router;