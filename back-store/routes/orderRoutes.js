const express = require('express')
const { protect } = require('../middleware/authMiddleware.js')
const router = express.Router()
const orderModel = require('../models/orderModel.js')
const productModel = require('../models/productModel.js')



router.post("/saveOrder",async (req, res) => {
    console.log("Body:", req.body)
    const data = req.body;
    const user = req.body.user;
    const product_name = req.body.product_name;
    const stock_prod = req.body.stock;
    console.log(req.body)
    const productExists = await orderModel.findOne({ user, product_name});
    const instock = await productModel.findOne({ product_name,stock: { $gt: 1 } });

   if(instock){
 
    if (productExists) {

        productExists.updateOne(
            { $inc: { quantity: 1 }}).then(
                instock.updateOne(
                    { $inc: { stock: -1 }}).then(res => console.log("Stock dec"))
            )
              
        res.status(400).json("ALready added");
            
    }
    else{
    const newblog = await new orderModel(data);
    newblog.save((error) => {
        if (error) {
            return ((500), res.send("Something went wrong"))
        }
        instock.updateOne(
            { $inc: { stock: -1 }}).then(res => console.log("Your data is saved in database!!! and Stock dec"))
        // res.send("Your data is saved in database!!!")
    })
}
   }
   else{
    res.send("Not in Stock!!!")
   }
})

router.get("/getCartData/:name",(req,res)=>{
// router.get("/getCartData/:name", protect, (req, res) => {
    const user = req.params.name
    orderModel.find({ user: user })
        .then((data) => {
            console.log(data)
            res.json(data)

        })
        .catch((error) => {
            console.log(error)
        })
})

router.put("/Loginuser/:name",(req,res)=>{
    let name = req.params.name

    orderModel.updateMany({user:"guest"},{$set:{user:name}}).then((res)=>{
        // console.log("user updated",name)
    })
   
})

router.get("/getLocalData/guest",(req,res)=>{
    // router.get("/getCartData/:name", protect, (req, res) => {
        orderModel.find({ user: "guest" })
            .then((data) => {
                console.log(data)
                res.json(data)
    
            })
            .catch((error) => {
                console.log(error)
            })
    })



router.delete("/delete/:id", (req, res) => {
    // router.delete("/delete/:id",protect,(req,res)=>{
    let id = req.params.id;
    orderModel.deleteOne({ _id: id }, (err) => {
        if (err) throw err
        res.send("Order deleted")
    })
})

router.delete("/deleteAll/:user", (req, res) => {
    let user = req.params.user;
    orderModel.deleteMany({ user: user }, (err) => {
        if (err) throw err
        res.send("Order deleted")
    })
})

router.get("/checkout_by_id", async (req, res) => {
    // let type = req.query.type
    let orderId = req.query.id

    // console.log("req.query.id", req.query.id)

    // console.log("productIds", productIds)
    //we need to find the product information that belong to product Id 
    try {
        const orders = await orderModel.find({ _id: orderId })

        res.send(orders)
        console.log(orders[0])
    } catch (error) {
        res.json({ message: error })
    }

});

router.put("/updateQty/:prod_id/:scope", async(req, res) => {
    let id = req.params.prod_id;
    let scope = req.params.scope;

    const instock = await productModel.findOne({ _id:id, stock: { $gt: 1 } });


    if (scope == 'inc') {
        orderModel.findByIdAndUpdate(id,

            { $inc: { quantity: 1 }}).then(res => console.log("Incremented"))
     
    }
    else {
        orderModel.findByIdAndUpdate(id,
            { $inc: { quantity: -1 } }).then(res => console.log("Decremented"))
          
    }

})



module.exports = router