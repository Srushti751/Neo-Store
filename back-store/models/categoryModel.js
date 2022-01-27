
  const mongoose = require('mongoose')

  const categorySchema = mongoose.Schema({
      category_name: String,
      product_image: String,
      category_id: Number,
     
    
  
  
  },{timestamps:true})
  
  const categoryModel = mongoose.model('category',categorySchema)
  
  module.exports = categoryModel;