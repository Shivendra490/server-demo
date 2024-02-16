

const express=require('express')
const adminController=require('../controllers/admin')
const rootDir=require('../util/path')

const router=express.Router()


//for url admin/,,,,

router.get('/add-product',adminController.getAddProduct)

router.post('/add-product',adminController.postAddProduct)

router.get('/products',adminController.getProducts)


module.exports=router
