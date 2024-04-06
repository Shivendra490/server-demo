const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose")


const User = require("./models/user");

const errorController = require("./controllers/error");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes=require("./routes/auth")

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

//to grant access of read only to public folder's file
app.use(express.static(path.join(__dirname, "public")));
//here __dirname = '/../../../app.js  i.e current file location

app.use((req, res, next) => {
  User.findById("66081cb2ba926885e1bb35e2")
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

mongoose.connect("mongodb+srv://user1:users1786@cluster1.jt6igif.mongodb.net/shops?retryWrites=true&w=majority&appName=Cluster1").then(result=>{
  User.findOne().then(user=>{
    if(!user){
      const user=new User({name:'Ram',email:'ram@gmail.com',cart:{items:[]}})
      user.save()
    }
  })
  app.listen(8000)
}).catch(err=>console.log(err))
