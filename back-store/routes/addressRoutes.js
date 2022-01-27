const express = require('express')
const router = express.Router()
const addressModel = require('../models/addressModel.js')
const orderModel = require('../models/orderModel.js')





router.get("/getCustAddress/:user",async(req,res)=>{
    let user = req.params.user
try {
    const cat = await addressModel.find({user:user})
    
    res.send(cat)
} catch (error) {
    res.json({message:error})
}
})

router.post("/address",(req,res)=>{
    console.log("Body:",req.body)
    const data = req.body;

    const newblog = new addressModel(data);
    newblog.save((error)=>{
        if(error){
            return(res.send("Something went wrong"))
        }
        res.send("Your data is saved in database!!!")
})
})

router.get("/address_by_id", async(req, res) => {
    let aid = req.query.id

   
    try {
    const address =await addressModel.find({ _id: aid  })
        
        res.send(address)
        console.log(address[0])
    } catch (error) {
        res.json({message:error})
    }
     
});

router.put("/updateAddress/:aid",(req,res)=>{
    const {homeAddress,pincode,state,country} = req.body;
    const id = req.params.aid
    // const newblog = new userModel(data);

    addressModel.updateMany({_id:id},
        {
            home_address:homeAddress,
            pincode:pincode,
            state:state,
            country:country
        })
    .then((data)=>{
        console.log(data)
        res.json(data)

    })
    .catch((error)=>{
        console.log(error)
    })
})

router.delete("/deleteAddress/:id",(req,res)=>{
    let id = req.params.id;
    addressModel.deleteOne({_id:id},(err)=>{
        if(err) throw err
        res.send("Address deleted")
    })
})

router.post("/selectAddress/:username",(req,res)=>{
    let add = req.body.add
    console.log("add",add)
    let user = req.params.username;
    orderModel.updateMany({user:user},{$set:{address:add}}).then((res)=>{
    })
})

module.exports = router