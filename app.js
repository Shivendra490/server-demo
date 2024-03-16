const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const mongoConnect=require("./util/database")

const errorController = require("./controllers/error");

// const adminRoutes = require("./routes/admin");
// const shopRoutes = require("./routes/shop");



const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// const arr=['arr1','arr2','arr3','arr4']

app.use(bodyParser.urlencoded({ extended: false }));

//to grant access of read only to public folder's file
app.use(express.static(path.join(__dirname, "public")));
//here __dirname = '/../../../app.js  i.e current file location

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user; 
  //     next()//here this user is not just js obj but a sequelize obj so that we can use seq methods like save() or destroy() etc
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

// app.use("/admin", adminRoutes);
// app.use(shopRoutes);

// db.execute('SELECT  * FROM products').then((result)=>console.log(result[0][0])).catch((err)=>console.log(err))

//This route is for page not found(very last middleware)
app.use(errorController.get404);


mongoConnect((client)=>{
  console.log("cccccccc",client)
  app.listen(8000)
})

