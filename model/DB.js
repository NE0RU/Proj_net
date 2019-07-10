const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';// Connection URL
const dbName = 'Memeber';// Database Name

var db;

MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
    db = client.db(dbName);
    db.member = db.collection('MBData');
  });

  // 드라마 리스트를 제공하는 메소드
  exports.signup = function(obj){
      db.member.find(obj.query).toArray(function(err, docs){
          if(err){
              console.log(err);
          }else{
              obj.callback(docs);
          }
      });
  }

  exports.insertmember = function(insertData){
      db.member.insertOne({id: insertData.paramID, pw: insertData.paramPw, name: insertData.paramName},
        function(err, result){
            if(err){
                console.log('Error!!!');
                res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" });
                res.write('<h1>에러발생</h1>');
                res.end();
                return;
            } 
            if (result) {
                console.dir(result);
                res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" });
                res.write('<h1>Add Success</h1>');
                res.write('<h1> name </h1>' + paramName);
                res.write('<br><a href="/signup.ejs"> re login </a>');
                res.end();
            }else{
                console.log('추가 안됨 Error!!!');
                res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" });
                res.write('<h1>can not add user</h1>');
                res.write('<a href="/login.html"> re login</a>');
                res.end();
            }
        });
  }