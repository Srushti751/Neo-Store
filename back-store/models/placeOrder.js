const mongoose = require('mongoose')

const placeOrderSchema = mongoose.Schema({
    card:{
        type:String,
        require:true
    },
    
    quantity:Number,
    total:Number,
    user:String,
    orderDetails:Array

},{timestamps:true})

const placeorderModel = mongoose.model('placeorder',placeOrderSchema)

module.exports = placeorderModel;