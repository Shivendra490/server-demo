const express = require("express");
const adminController = require("../controllers/admin");
// const rootDir=require('../util/path')

const isAuth=require('../middleware/is-auth')

const router = express.Router();

//for url admin/,,,,

router.get("/add-product",isAuth, adminController.getAddProduct);

router.post("/add-product", isAuth,adminController.postAddProduct);

router.get("/edit-product/:productId",isAuth, adminController.getEditProduct);

router.post("/delete-product",isAuth, adminController.postDeleteProduct);

router.post("/edit-product",isAuth, adminController.postEditProduct);

router.get("/products",isAuth, adminController.getProducts);

module.exports = router;
