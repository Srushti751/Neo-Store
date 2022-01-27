const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    // "product_id": "5cfe3e81b4db0f338946eabc",
    product_name: String,
    product_image: String,
    product_desc: String,
    // product_rating: "3.34",
    // product_producer: "Winchester Pvt. Ltd.",
    product_cost: Number,
    // category_id: Number,
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
     },
     color_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"color"
     },
    category_name: String,
    color:String,
    images:Array,
    rating:Number,
    stock:Number
    
    // product_stock: 443,
    // product_dimension: "84 * 28",
    // product_material: "Cobalt, Material",


},{timestamps:true})

const productModel = mongoose.model('product',productSchema)

module.exports = productModel;