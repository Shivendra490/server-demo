const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://user1:users1786@cluster1.jt6igif.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
  )
    .then((client) => {
      console.log("CONNECTED");
      callback(client);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
