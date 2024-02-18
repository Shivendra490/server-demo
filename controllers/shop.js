const Product=require('../models/product')
const Cart=require('../models/cart')


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


exports.getProduct=(req,res,next)=>{
  const prodId=req.params.productId
    Product.findById(prodId,product=>{
        console.log('here24 why',product)
        res.render('shop/product-details',{product:product,path:"/details",pageTitle:'hey',path:"/products"})
    })
    
}



exports.getCart=(req,res,next)=>{
    res.render('shop/cart',{pageTitle:"Your Cart",path:"/cart"})
}

exports.postCart=(req,res,next)=>{
    const prodId=req.body.productId 
    Product.findById(prodId,product=>{
        Cart.addProductToCart(product.id,product.price)
    })
    res.redirect('/cart')
}

exports.getOrders=(req,res,next)=>{
    res.render('shop/orders',{pageTitle:"Your Orders",path:"/orders"})
}

exports.getCheckout=(req,res,next)=>{
    res.render('shop/checkout',{pageTitle:"Your Cart",path:"/checkout"})
}