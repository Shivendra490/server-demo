const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows,fieldData]) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "shop index",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {

Product.fetchAll()
    .then(([rows]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "Product list",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
  //static method of class can be directly call without creating obj,i.e classname.staticMethod()
  // res.sendFile(path.join(__dirname,'../','views','shop.html'))
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId).then(([product])=>{
    // console.log('prd',product[0],'prdd');
    res.render("shop/product-details", {
      product: product[0],
      path: "/details",
      pageTitle: "hey",
      path: "/products",
    });
  }).catch(err=>console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prd) => prd.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({
            productData: product,
            quantity: cartProductData.quantity,
          });
        }
      }
      res.render("shop/cart", {
        products: cartProducts,
        pageTitle: "Your Cart",
        path: "/cart",
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProductToCart(product.id, product.price);
  });
  res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { pageTitle: "Your Orders", path: "/orders" });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { pageTitle: "Your Cart", path: "/checkout" });
};
