const User = require('../models/user')
exports.getLogin = (req, res, next) => {
    res.render("auth/login", {
        pageTitle: "Login",
        path: "/login",
        isAuthenticated:req.session.isLoggedIn
      });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
      pageTitle: "Signup",
      path: "/signup",
      isAuthenticated:false
    });
};

exports.postLogin = (req, res, next) => {
  // res.setHeader('Set-Cookie','loggedIn=true')
  User.findById("66081cb2ba926885e1bb35e2")
    .then((user) => {
      req.session.user = user//this is mongoose user obj not just simply js obj so that it have all methods provided by mongoose
      req.session.isLoggedIn=true
      req.session.save((err)=>{//save() ensures that once session date updated in db then only this fn run and then we redirect 
        console.log(err)
        res.redirect("/")
      })
    })
    .catch((err) => {
      console.log(err);
    });
  
};

exports.postSignup = (req, res, next) => {
 const {email,password,confirmPassword}=req.body
 //we can validate here later
  User.findOne({email:email}).then(isUser=>{
    if(isUser){
      return res.redirect('/signup')
    }
    const user=new User({email:email,password:password,cart:{items:[]}})
    return user.save()
  })
  .then(result=>{
    res.redirect("/login")
  }).catch(err=>console.log(err))
};

exports.postLogout=(req,res,next)=>{
  req.session.destroy((err)=>{
    console.log(err)
    res.redirect("/")
  })
}