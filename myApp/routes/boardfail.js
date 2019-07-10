var express = require('express');
var router = express.Router();

var Num;

/* GET home page. */
router.get('/', function(req, res, next) {
    Num = req.body.number || req.query.number;
    console.log('Number : ' + Num);
  res.render('boardfail.ejs', {
      Num: Num
  });
});

module.exports = router;
