var express = require('express');
var router = express.Router();

router.get("/", function(req,res,next){
    if (req.session.user) {
        console.log('로그아웃 처리');
        req.session.destroy(
            function (err) {
                if (err) {
                    console.log('세션 삭제시 에러');
                    return;
                }
                console.log('세션 삭제 성공');
                //파일 지정시 제일 앞에 / 를 붙여야 root 즉 public 안에서부터 찾게 된다
                res.redirect('/login');
            }
        );          //세션정보 삭제

    } else {
        console.log('login 안되어 있음');
        res.redirect('/login');
    }
})

module.exports = router;
