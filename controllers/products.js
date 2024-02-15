const Product=require('../models/product')

exports.getAddProduct=(req,res,next)=>{
    
    // res.sendFile(path.join(__dirname,'../','views','add-product.html')) 
    // res.sendFile(path.join(rootDir,'views','add-product.html'))
    res.render('add-product',{pageTitle:'add product',path:"admin/add-product"})
}

exports.postAddProduct=(req,res,next)=>{
    const product=new Product(req.body.title)
    product.save()
    res.redirect('/')
}

exports.getProduct=(req,res,next)=>{
    const products=Product.fetchAll()
    //static method of class can be directly call without creatin obj,i.e classname.staticMethod()
    // res.sendFile(path.join(__dirname,'../','views','shop.html'))
    res.render('shop',{prods:products,pageTitle:"shop-js",path:"/"})
}