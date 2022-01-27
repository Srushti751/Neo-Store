const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    product_name:{
        type:String,
        require:true
    },
    product_image:String,
    product_cost:Number,
    product_total:Number,
    quantity:Number,
    user:String,
    address:Array

},{timestamps:true})

const orderModel = mongoose.model('order',orderSchema)

module.exports = orderModel;