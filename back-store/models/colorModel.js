
  const mongoose = require('mongoose')

  const colorSchema = mongoose.Schema({
      color: String,
      product_image: String,
      color_id: Number,
     
    
  
  
  },{timestamps:true})
  
  const colorModel = mongoose.model('color',colorSchema)
  
  module.exports = colorModel;