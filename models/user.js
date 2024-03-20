const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => console.log(err));
  }

  addToCart(product) {
    let newQuantity = 1;
    const cartProductIndex = this.cart.items.findIndex(
      (cp) => cp.productId.toString() === product._id.toString()
    );
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = { items: updatedCartItems };
    const db = getDb();

    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const productIds = this.cart.items.map((item) => item.productId);
    console.log(productIds)
    const db = getDb();
    return db.collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((product) => {
          return {
            ...product,
            quantity: this.cart.items.find(
              (cartPrd) =>
                cartPrd.productId.toString() === product._id.toString()
            ).quantity,
          };
        });
      });
    
    // const obj={}
    // const productIds = this.cart.items.map(item=>{
    //   obj[item.productId]=item.quantity
    //   return item.productId
    // });
    // let idList=Object.keys(obj)
    // console.log(idList)
    // console.log('kk',productIds)

    // const db = getDb();
    // return db.collection("products")
    //   .find({ _id: { $in: productIds} })
    //   .toArray()
    //   .then((products) => {
    //     return products.map((product) => {
    //       return {
    //         ...product,
    //         quantity: obj[product._id.toString()]
    //       };
    //     });
    //   });

    
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        return user;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = User;
