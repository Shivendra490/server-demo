const mongoose=require("mongoose")

const Schema=mongoose.Schema

const productSchema=new Schema({
  title:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  imageUrl:{
    type:String,
    required:true,
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User',// here ref is used to create reference the userId that belongs to User model
    required:true
  }
})

module.exports=mongoose.model('Product',productSchema);

