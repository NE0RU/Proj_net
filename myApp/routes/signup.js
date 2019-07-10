var express = require('express');
var router = express.Router();

var model = require('../model/DB');

router.get('/', function(req, res, next) {
    res.render('signup.ejs', {
        session : req.session.user
    });
  });

router.post('/', function(req, res){
    console.log('회원가입');
    var paramID = req.body.id || req.query.id;
    var paramPW = req.body.pw || req.query.pw;
    var paramName = req.body.name || req.query.name;
    console.log('paramID : ' + paramID + ', paramPW : ' + paramPW + ', paramName : ' + paramName);
    if(req.body.id && req.body.pw && req.body.name){
        console.log('DB삽입시도');
        model.addUser(paramID, paramPW, paramName, function(err, result){
            if(err){
                console.log('Error!!!');
                res.redirect('signupfail');
                return;
            }if(result){
                console.dir('성공');
                res.redirect('signupsuccess');
            }else{
                console.log('추가 안됨 Error!!!');
                res.redirect('signupfail');
            }
        });
    }else{
        console.log('입력값이 없음');
        res.redirect('signupfail');
    }
});

module.exports = router;