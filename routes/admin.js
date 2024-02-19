

const express=require('express')
const adminController=require('../controllers/admin')
const rootDir=require('../util/path')

const router=express.Router()


//for url admin/,,,,

router.get('/add-product',adminController.getAddProduct)

router.post('/add-product',adminController.postAddProduct)

router.get('/edit-product/:productId',adminController.getEditProduct)

router.post('/delete-product',adminController.postDeleteProduct)

router.post('/edit-product',adminController.postEditProduct)

router.get('/products',adminController.getProducts)


module.exports=router
