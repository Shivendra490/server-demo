const fs=require('fs')
const path=require('path')

const p=path.join(path.dirname(require.main.filename),'data','products.json');

const getProductsFromFile=(cb)=>{
    fs.readFile(p,(err,fileContent)=>{
        if(err){
            cb([])
        }else{
            cb(JSON.parse(fileContent))
        }
        
    })

}

// const products=[]
module.exports=class Product{
    constructor(title,imageUrl,price,description){
        this.title=title
        this.imageUrl=imageUrl
        this.price=price
        this.description=description

    }

    save(){
        this.id=Math.random().toString()
        getProductsFromFile((products)=>{
            products.push(this)   
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log('nnnn',err)
            })
        })
       
        // let products=[]
        // fs.readFile(p,(err,fileContent)=>{
        //     if(!err){
        //         products=JSON.parse(fileContent)
        //     }
        //     products.push(this)   
        //     fs.writeFile(p,JSON.stringify(products),(err)=>{
        //         console.log('nnnn',err)
        //     })
        // })
        
        
    }
   
    static fetchAll(cb){
        
        getProductsFromFile(cb)
       
    }

    static findById(id,cb){
        getProductsFromFile((products)=>{
            const product=products.find((prd)=>prd.id===id)
            cb(product)
        })
    }
}