// const mysql=require('mysql2')

// const pool=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'node-complete',
//     password:'roots@786'
// })

// module.exports=pool.promise()



const Sequelize=require('sequelize')

// sequelize use mysql2 and above config behind the scene 
const sequelize=new Sequelize('node-complete','root','roots@786',{dialect:'mysql',host:'localhost'})

module.exports=sequelize;