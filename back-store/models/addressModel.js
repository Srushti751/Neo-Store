
  const mongoose = require('mongoose')

  const addressSchema = mongoose.Schema({
      home_address: String,
      pincode: Number,
      state: String,
      country: String,
     user:String
    
  
  
  },{timestamps:true})
  
  const addressModel = mongoose.model('address',addressSchema)
  
  module.exports = addressModel;