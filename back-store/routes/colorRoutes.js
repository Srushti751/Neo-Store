const express = require('express')
const router = express.Router()
const colorModel = require('../models/colorModel.js')





router.get("/getColor",async(req,res)=>{
try {
    const color = await colorModel.find({})
    
    res.send(color)
} catch (error) {
    res.json({message:error})
}
})

router.post("/saveColor",(req,res)=>{
    console.log("Body:",req.body)
    const data = req.body;

    const newblog = new colorModel(data);
    newblog.save((error)=>{
        if(error){
            return((500),res.send("Something went wrong"))
        }
        res.send("Your data is saved in database!!!")
})
})

module.exports = router