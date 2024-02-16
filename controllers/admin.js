const Product=require('../models/product')

exports.getAddProduct=(req,res,next)=>{
    
    // res.sendFile(path.join(__dirname,'../','views','add-product.html')) 
    // res.sendFile(path.join(rootDir,'views','add-product.html'))
    //we need to give path according to view like inside view we have admin/add-product.ejs because it already register where to search view
    res.render('admin/add-product',{pageTitle:'add product',path:"admin/add-product"})
}

exports.postAddProduct=(req,res,next)=>{
    const {title,imageUrl,price,description}=req.body
    const product=new Product(title,imageUrl,price,description)
    product.save()
    res.redirect('/')
}


exports.getProducts=(req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('admin/products',{prods:products,pageTitle:"Admin Products",path:"/admin/products"})
    })
 
    
}