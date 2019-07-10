var express = require('express');
var router = express.Router();

var model = require('../model/DB');

router.get('/', function(req, res, next) {
  res.render('login.ejs', {
    session : req.session.user
  });
});

router.post('/', function(req, res){
  console.log('Login');
  var paramID = req.body.id || req.query.id;
  var paramPW = req.body.pw || req.query.pw;
   if(req.body.id && req.body.pw){
      console.log('로그인시도');
      model.checkmember(paramID, paramPW, function(err, docs){
        if(err){
          console.log('Error!!!');
          res.redirect('loginfail');
          return;
        }if(docs){
          if (req.session.user) {
            console.log('이미 로그인 되어 있음');
            res.redirect('loginfail');
        }else {
          req.session.user =
              {
                  id: docs[0].id,
                  pw: docs[0].pw,
                  name: docs[0].name,
                  authorized: true
              };
              res.redirect('login');
        }
        }else{
          console.log('empty Error!!!');
          res.redirect('loginfail');
        }
      });
    }else{
      console.log('입력값이 없음');
      res.redirect('loginfail');
    }
});

module.exports = router;