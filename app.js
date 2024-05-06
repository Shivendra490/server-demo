const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose")
const session=require("express-session")
const MongoDBStore=require("connect-mongodb-session")(session)
const flash=require('connect-flash')


const User = require("./models/user");

const errorController = require("./controllers/error");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes=require("./routes/auth")

const MONGODB_URI="mongodb+srv://user1:users1786@cluster1.jt6igif.mongodb.net/shops?retryWrites=true&w=majority&appName=Cluster1"

const app = express();
const store=new MongoDBStore({
  uri:MONGODB_URI,
  collection:"sessions",
  // expires:
})

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({secret:'my secret',resave:false,saveUninitialized:false,store:store}))
app.use(flash())
//to grant access of read only to public folder's file
app.use(express.static(path.join(__dirname, "public")));
//here __dirname = '/../../../app.js  i.e current file location

app.use((req, res, next) => {
  if(!req.session.user){
    return next()
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user//this is mongoose user obj not just simply js obj so that it have all methods provided by mongoose
      next();
    })
    .catch((err) => {
      console.log(err);
    });

});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes)


app.use(errorController.get404);

mongoose.connect(MONGODB_URI).then(result=>{
  app.listen(8000)
}).catch(err=>console.log(err))
