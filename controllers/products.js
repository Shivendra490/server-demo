const Product=require('../models/product')

exports.getAddProduct=(req,res,next)=>{
    
    // res.sendFile(path.join(__dirname,'../','views','add-product.html')) 
    // res.sendFile(path.join(rootDir,'views','add-product.html'))
    //we need to give path according to view like inside view we have admi/add-product.ejs because it already register where to search view
    res.render('admin/add-product',{pageTitle:'add product',path:"admin/add-product"})
}

exports.postAddProduct=(req,res,next)=>{
    const product=new Product(req.body.title)
    product.save()
    res.redirect('/')
}

exports.getProduct=(req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('shop/product-list',{prods:products,pageTitle:"shop-js",path:"/"})
    })
    //static method of class can be directly call without creatin obj,i.e classname.staticMethod()
    // res.sendFile(path.join(__dirname,'../','views','shop.html'))
    
}