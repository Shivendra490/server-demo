const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart=require('./models/cart')
const CartItem=require('./models/cart-item')
const Order=require("./models/order")
const OrderItem=require("./models/order-item")


const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// const arr=['arr1','arr2','arr3','arr4']

app.use(bodyParser.urlencoded({ extended: false }));

//to grant access of read only to public folder's file
app.use(express.static(path.join(__dirname, "public")));
//here __dirname = '/../../../app.js  i.e current file location

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user; 
      next()//here this user is not just js obj but a sequelize obj so that we can use seq methods like save() or destroy() etc
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

// db.execute('SELECT  * FROM products').then((result)=>console.log(result[0][0])).catch((err)=>console.log(err))

//This route is for page not found(very last middleware)
app.use(errorController.get404);

// const server = http.createServer(app);

// server.listen(3000);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product,{through:CartItem})
Product.belongsToMany(Cart,{through:CartItem}) // through=> telling sequilize, where these connection to be stored 
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product,{through:OrderItem})


sequelize
  .sync() //{force:true}will create table again if exist ,we should not use this in production
  .then((result) => {
    return User.findByPk(1); //here we are just simulating user i.e dummy user for now
  })
  .then((user) => {
    if (!user) {
      return User.create({ id: 1, name: "Ram", email: "ram@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart()
  }).then(cart=>{
    app.listen(8000)
  })
  .catch((err) => console.log(err));
