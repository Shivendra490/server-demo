const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getIndex = (req, res, next) => {
  Product.findAll().then(products=>{
    res.render("shop/index", {
      prods: products,
      pageTitle: "shop index",
      path: "/",
    });
  }).catch(err=>console.log(err))
  
};

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products=>{
    console.log('prd',products)
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Product list",
      path: "/products",
    });
  }).catch(err=>console.log(err))

   
  
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({where:{id:prodId}}).then((products)=>{
    res.render("shop/product-details", {
      product: products[0],
      path: "/details",
      pageTitle: products[0].title,
      path: "/products",
    });
  }).catch(err=>console.log(err));
  // Product.findByPk(prodId).then((product)=>{
  //   res.render("shop/product-details", {
  //     product: product,
  //     path: "/details",
  //     pageTitle: "hey",
  //     path: "/products",
  //   });
  // }).catch(err=>console.log(err));
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
