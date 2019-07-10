var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('info.ejs', {
    session : req.session.user,
    id : req.session.user.id,
    pw : req.session.user.pw,
    name : req.session.user.name
  });
});

module.exports = router;