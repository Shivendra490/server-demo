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
    constructor(id,title,imageUrl,price,description){
        this.id=id
        this.title=title
        this.imageUrl=imageUrl
        this.price=price
        this.description=description

    }

    save(){
        
        getProductsFromFile((products)=>{
            if(this.id){
                const existingProductIndex=products.findIndex(product=>this.id===product.id)
                const updatedProducts=[...products]
                updatedProducts[existingProductIndex]=this;
                fs.writeFile(p,JSON.stringify(updatedProducts),err=>console.log(err))
            
            }else{
                this.id=Math.random().toString()
                products.push(this)   
                fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log('nnnn',err)
                })
            }
            
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