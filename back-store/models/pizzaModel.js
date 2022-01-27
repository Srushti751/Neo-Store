const mongoose = require('mongoose')

const pizzaSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    image:String,
    price:Number,

},{timestamps:true})

const pizzaModel = mongoose.model('pizza',pizzaSchema)

module.exports = pizzaModel;