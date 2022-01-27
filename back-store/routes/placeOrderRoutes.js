const express = require('express')
const { protect } = require('../middleware/authMiddleware.js')
const router = express.Router()
const placeorderModel = require('../models/placeOrder.js')



router.post("/orderplace",(req,res)=>{
    console.log("Body:",req.body)
    const data = req.body;
  
    const newblog = new placeorderModel(data);
    res.send(newblog)

    newblog.save()
    
 
 
})

router.get("/getOrderDetails/:user",protect,(req,res)=>{
// router.get("/getOrderDetails/:user",protect,(req,res)=>{
    let user = req.params.user;
    placeorderModel.find({user:user})
    .then((data)=>{
        console.log(data)
        res.json(data)

    })
    .catch((error)=>{
        console.log(error)
    })
})


module.exports = router