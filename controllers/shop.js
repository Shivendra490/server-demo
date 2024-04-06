const Order = require("../models/order");
const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
  // const isLoggedIn=req.get('Cookie')
  const isLoggedIn=req.session.isLoggedIn
  // console.log('sess',req.session)
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "shop index",
        path: "/",
        isAuthenticated:isLoggedIn
      });
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Product list",
        path: "/products",
        isAuthenticated:req.isLoggedIn
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-details", {
        product: product,
        path: "/details",
        pageTitle: product.title,
        path: "/products",
        isAuthenticated:req.isLoggedIn
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      // console.log('pppppooooo',user.cart.items)
      const products = user.cart.items;
      res.render("shop/cart", {
        products: products,
        pageTitle: "Your Cart",
        path: "/cart",
        isAuthenticated:req.isLoggedIn
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => res.redirect("/cart"))
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((prd) => {
        return { quantity: prd.quantity, product: { ...prd.productId._doc } }; // if we fetch product.productIt then it will give only product id if we want to full data having id then we need to do {...prd.productId._doc}
      });
      const order = new Order({
        products: products,
        user: { name: req.user.name, userId: req.user._id },
      });
      return order.save();
    })
    .then((result) => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "Your Orders",
        path: "/orders",
        orders: orders,
        isAuthenticated:req.isLoggedIn
      });
    })
    .catch((err) => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { pageTitle: "Your Cart", path: "/checkout", isAuthenticated:req.isLoggedIn });
};
