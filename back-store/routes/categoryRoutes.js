const express = require('express')
const router = express.Router()
const categoryModel = require('../models/categoryModel.js')




router.get("/getCategory",async(req,res)=>{
try {
    const cat = await categoryModel.find({})
    
    res.send(cat)
} catch (error) {
    res.json({message:error})
}
})

router.post("/saveCategory",(req,res)=>{
    console.log("Body:",req.body)
    const data = req.body;

    const newblog = new categoryModel(data);
    newblog.save((error)=>{
        if(error){
            return((500),res.send("Something went wrong"))
        }
        res.send("Your data is saved in database!!!")
})
})

module.exports = router