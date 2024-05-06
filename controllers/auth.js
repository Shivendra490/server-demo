const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  
  let message=req.flash('error')
  if(message.length>0){
    message=message[0]
  }else{
    message=null
  }
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isAuthenticated: req.session.isLoggedIn,
    errorMessage:message
  });
};

exports.getSignup = (req, res, next) => {
let message=req.flash('error')
  if(message.length>0){
    message=message[0]
  }else{
    message=null
  }
  res.render("auth/signup", {
    pageTitle: "Signup",
    path: "/signup",
    isAuthenticated: false,
    errorMessage:message
  });
};

exports.postLogin = (req, res, next) => {
  // res.setHeader('Set-Cookie','loggedIn=true')
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash('error','Invalid email or password')
        return res.redirect("/login");
      }

      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.user = user; //this is mongoose user obj not just simply js obj so that it have all methods provided by mongoose
            req.session.isLoggedIn = true;
            return req.session.save((err) => {
              //save() ensures that once session date updated in db then only this fn run and then we redirect
              console.log(err);
              res.redirect("/");
            });
          }
          req.flash('error','Invalid email or password')
          res.redirect('/login')
        })
        .catch((err) => {
          console.log(err)
          res.redirect('/login')
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  //we can validate here later

  User.findOne({ email: email })
    .then((isUser) => {
      if (isUser) {
        req.flash('error','email already exist, try another one')
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
