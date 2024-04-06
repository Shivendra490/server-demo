exports.getLogin = (req, res, next) => {
    res.render("auth/login", {
        pageTitle: "Login",
        path: "/login",
        isAuthenticated:req.isLoggedIn
      });
};

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie','loggedIn=true')
  res.redirect("/")
};