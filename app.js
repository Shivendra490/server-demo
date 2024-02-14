const path=require('path')
const express=require('express')
const bodyParser=require('body-parser')

const adminData=require('./routes/admin')
const shopRoutes=require('./routes/shop')

const app=express()

app.set('view engine','ejs')
app.set('views','views')

const arr=['arr1','arr2','arr3','arr4']

app.use(bodyParser.urlencoded({extended:false}))

//to grant access of read only to public folder's file
app.use(express.static(path.join(__dirname,'public')))
//here __dirname = '/../../../app.js  i.e current file location

app.use('/admin',adminData.routes)
app.use(shopRoutes)


//This route is for page not found(very last middleware)
app.use((req,res,next)=>{
    // res.status(404).sendFile(path.join(__dirname,'views','404.html'))
    res.status(404).render('404',{pageTitle:'not found page'})
})


// const server = http.createServer(app);

// server.listen(3000);
app.listen(8000)
