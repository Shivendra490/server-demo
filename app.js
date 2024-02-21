const path=require('path')
const express=require('express')
const bodyParser=require('body-parser')

const errorController=require('./controllers/error')

const adminRoutes=require('./routes/admin')
const shopRoutes=require('./routes/shop')
const db=require('./util/database')

const app=express()

app.set('view engine','ejs')
app.set('views','views')

// const arr=['arr1','arr2','arr3','arr4']

app.use(bodyParser.urlencoded({extended:false}))

//to grant access of read only to public folder's file
app.use(express.static(path.join(__dirname,'public')))
//here __dirname = '/../../../app.js  i.e current file location

app.use('/admin',adminRoutes)
app.use(shopRoutes)

// db.execute('SELECT  * FROM products').then((result)=>console.log(result[0][0])).catch((err)=>console.log(err))


//This route is for page not found(very last middleware)
app.use(errorController.get404)


// const server = http.createServer(app);

// server.listen(3000);
app.listen(8000)
