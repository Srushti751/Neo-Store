const express = require('express')
const { protect } = require('../middleware/authMiddleware.js')
const categoryModel = require('../models/categoryModel.js')
const router = express.Router()
const productModel = require('../models/productModel.js')




router.get("/getProduct", async (req, res) => {
    try {
        const prod = await productModel.find().populate(["category_id", "color_id"])
        res.send(prod)
    } catch (error) {
        res.json({ message: error })
    }
})

router.get("/getProduct/rating", async (req, res) => {
    try {
        const prod = await productModel.find().sort({ 'rating': -1 })

        res.send(prod)
    } catch (error) {
        res.json({ message: error })
    }
})



router.put("/rateProduct/:id", (req, res) => {
    let id = req.params.id
    const { rating } = req.body;

    productModel.updateMany({ _id: id },
        {
            rating: rating,
        })
        .then((data) => {
            console.log(data)
            res.json(data)

        })
        .catch((error) => {
            console.log(error)
        })
})




router.get("/products_by_id", async (req, res) => {
    // let type = req.query.type
    let productIds = req.query.id

    // console.log("req.query.id", req.query.id)

    // console.log("productIds", productIds)
    //we need to find the product information that belong to product Id 
    try {
        const prod = await productModel.find({ _id: productIds })

        res.send(prod)
        console.log(prod[0])
    } catch (error) {
        res.json({ message: error })
    }

});



// Sort Product By Category
router.get("/getProduct/:category_id", async (req, res) => {
    const id = req.params.category_id;
    try {
        const prod = await productModel.find({ category_id: id })

        res.send(prod)
    } catch (error) {
        res.json({ message: error })
    }
})

//Sort Product By Color
router.get("/getProductColorID/:color_id", async (req, res) => {
    const id = req.params.color_id;
    try {
        const prod = await productModel.find({ color_id: id })

        res.send(prod)
    } catch (error) {
        res.json({ message: error })
    }
})

// router.get("/getProductCategory/:category_name",async(req,res)=>{
//     const name = req.params.category_name;
//     try {
//         const prod = await productModel.find({category_name:name})

//         res.send(prod)
//     } catch (error) {
//         res.json({message:error})
//     }
//     })

// router.get("/getProductColor/:color",async(req,res)=>{
//     const name = req.params.color;
//     try {
//         const prod = await productModel.find({color:name})

//         res.send(prod)
//     } catch (error) {
//         res.json({message:error})
//     }
//     })

router.post("/saveProduct", (req, res) => {
    console.log("Body:", req.body)
    const data = req.body;

    const newblog = new productModel(data);
    newblog.save((error) => {
        if (error) {
            return ((500), res.send("Something went wrong"))
        }
        res.send("Your data is saved in database!!!")
    })
})

module.exports = router