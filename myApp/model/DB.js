const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';// Connection URL
const dbName = 'Memeber';// Database Name

var db;

MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
    db = client.db(dbName);
    db.member = db.collection('MBData');
  });

  exports.addUser = function(id, pw, name, callback){
    console.log('add User 호출됨' + id + '  , ' + pw);
    //컬렉션에 데이터 추가할때는 배열 형태로 집어 넣는다
    db.member.insertOne({id: id, pw: pw, name: name},
        function(err, result){
            if (err) {
                callback(err, null);
                return;
            }
            //데이터가 추가됐다면 insertedCount 카운트가 0 보다 큰값이 된다
            if (result.insertedCount > 0) {
                console.log('사용자 추가 됨' + result.insertedCount);
                callback(null, result);
            }
            else {
                console.log('사용자 추가 안됨' + result.insertedCount);
                callback(null, null);
            }
        }
    );
};

  exports.checkmember = function(id, pw, callback){
    console.log('input id :' + id + ' pw : ' + pw);
    db.member.find({ "id": id, "pw": pw }).toArray(function(err, docs){
            if(err) {
                callback(err, null);
                return;
            }if(docs.length > 0){
                console.log('find user [ ' + docs + ' ]');
                callback(null, docs);
            }else{
                console.log('can not find user [ ' + docs + ' ]');
                callback(null, null);
            }
        }
    );
  };