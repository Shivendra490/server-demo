const Product=require('../models/product')


exports.getIndex=(req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('shop/index',{prods:products,pageTitle:"shop index",path:"/"})
    })
}


exports.getProducts=(req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('shop/product-list',{prods:products,pageTitle:"Product list",path:"/products"})
    })
    //static method of class can be directly call without creatin obj,i.e classname.staticMethod()
    // res.sendFile(path.join(__dirname,'../','views','shop.html'))
    
}




exports.getCart=(req,res,next)=>{
    res.render('shop/cart',{pageTitle:"Your Cart",path:"/cart"})
}

exports.getOrders=(req,res,next)=>{
    res.render('shop/orders',{pageTitle:"Your Orders",path:"/orders"})
}

exports.getCheckout=(req,res,next)=>{
    res.render('shop/checkout',{pageTitle:"Your Cart",path:"/checkout"})
}