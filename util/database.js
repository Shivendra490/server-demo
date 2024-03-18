const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {

  MongoClient.connect(
    "mongodb+srv://user1:users1786@cluster1.jt6igif.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
  )
    .then((client) => {
      console.log("CONNECTED");
      _db=client.db('shop')//If shop database does not exist it will be created
      callback();
    })
    .catch((err) => {
      console.log(err)
      throw err;
    });
};

const getDb=()=>{
  if(_db){
    return _db;
  }
  throw "DATABASE NOT FOUND"
}

exports.mongoConnect = mongoConnect;
exports.getDb=getDb;
