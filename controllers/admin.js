const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    editing: false,
    pageTitle: "add product",
    path: "admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    null,
    req.user?._id
  );
  product
    .save()
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    // Product.findByPk(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        editing: editMode,
        pageTitle: "Edit product",
        path: "admin/edit-product",
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const product = new Product(
    updatedTitle,
    updatedPrice,
    updatedDescription,
    updatedImageUrl,
    prodId
  );
  product
    .save()
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
