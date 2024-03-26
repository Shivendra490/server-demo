const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

const errorController = require("./controllers/error");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

//to grant access of read only to public folder's file
app.use(express.static(path.join(__dirname, "public")));
//here __dirname = '/../../../app.js  i.e current file location

app.use((req, res, next) => {
  User.findById("65f81bc8b250de4de45788a9")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

//This route is for page not found(very last middleware)
app.use(errorController.get404);

mongoConnect(() => {
  app.listen(8000);
});
