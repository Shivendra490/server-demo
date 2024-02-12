const path=require('path')

const express=require('express')


const router=express.Router()

const adminData=require('./admin')

router.get('/',(req,res,next)=>{
    console.log(adminData.products)
    // res.sendFile(path.join(__dirname,'../','views','shop.html'))
    res.render('shop',{prods:adminData.products,pageTitle:"shop-js",path:"/"})
})


module.exports=router


