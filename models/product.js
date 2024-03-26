const mongodb=require('mongodb')

const getDb = require("../util/database").getDb;
class Product {
  constructor(title, price, description, imageUrl,id,userId) {
    console.log('iiidd',id);
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id=id ? new mongodb.ObjectId(id):null;
    this.userId=userId;
  }

  save() {
    let db = getDb();
    let dbOperation;
    console.log('ttthhere',this._id)
    if(this._id){
      dbOperation=db.collection('products').updateOne({_id:this._id},{$set:this})
    }else{
      dbOperation=db
      .collection("products")
      .insertOne(this)
    }
    return dbOperation
      .then((result) => {
        console.log("here", result);
      })
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => console.log(err));
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({_id: new mongodb.ObjectId(prodId) } )//find() return cursor obj we can use toArray() or next()
      .next()
      .then((product) => {
        console.log('prprprprpprprpr',product)
        return product;
      })
      .catch((err) => console.log(err));
  }

  static deleteById(prodId){
    const db=getDb()
    return db.collection('products').deleteOne({_id:new mongodb.ObjectId(prodId)}).then(result=>{
      console.log('Deleted',result)
    })
  }
}

module.exports = Product;
