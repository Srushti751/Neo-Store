const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel.js');
const generateToken = require('../utils/generateToken.js');
const crypto = require('crypto');
const nodemailer = require('nodemailer')
const multer = require('multer')
const {protect} = require('../middleware/authMiddleware.js');
const { validateEmployee, validateData } = require('../expressvalidator/validateEmployee.js');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images/')
    },
    filename:(req,file,cb)=>{
      cb(null, Date.now()+file.originalname)
    }
  })

 

  const fileFilter=(req, file, cb)=>{
   if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
       cb(null,true);
   }else{
       cb(null, false);
   }

  }

var upload = multer({ 
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:fileFilter
 });


const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'shettysrushti55555@gmail.com',
        pass: 'Pushpashetty57#'
    }
})



router.get("/protected",protect,async(req,res)=>{
    console.log(req.headers.authorization)
    return res.json({message:"this route is protected"})
})

router.post("/register",validateEmployee,validateData, async (req, res) => {
    const { name, email, password,phone,dob } = req.body;
    const userExists = await userModel.findOne({ email });
    console.log("data",req.body.name)
    if (userExists) {
        res.status(400).json("User Exists");
        throw new Error("User already exists");
    }
    else {
        const newblog = await new userModel({ name, email, password,phone,dob });

        newblog.save((error) => {
            if (error) {
                return ((500), res.send("Something went wrong"))
            }
            res.send("Your data is saved in database!!!",newblog)

        })
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email })
        if (user && (await user.matchPassword(password))) {
            console.log(user.email)

            const currentUser = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user.Id,
                token: generateToken(user._id,user.name)
            }
            res.status(200).send(currentUser)
        }
        else {
            res.status(400).json({
                message: "Login Failed"
            })
        }
    } catch (error) {
        res.send(error)
    }
})

router.get("/userData/:user",async(req,res)=>{
    const user = req.params.user
    try {
        const profile = await userModel.findOne({ name: user })

        res.send(profile)
        console.log(profile[0])
    } catch (error) {
        res.json({ message: error })
    }
})

router.post('/reset-password', async (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err)
        }
        let { email } = req.body
        const token = buffer.toString("hex")
        const otp = Math.floor(1000 + Math.random() * 9000)
        userModel.findOne({ email: email })
            .then(user => {
                if (!user) {
                    return res.status(422).json({ error: "User dont exists with that email" })
                }
                user.resetToken = token
                user.otp = otp
                user.expireToken = Date.now() + 3600000
                user.save().then((result) => {
                    transporter.sendMail({
                        to: user.email,
                        from: "shettysrushti55555@gmail.com",
                        subject: "password reset",
                        html: `
                    <p>You requested for password reset</p>
                    <h3>click in this <a href="http://localhost:3000/reset/${token}">link</a> and your ${otp} OTP to reset password</h3>
                    `
                    })
                    res.json({ message: "check your email" })
                })
                // return res.status(200).json("User exists ")
            })
    })
})





router.post('/new-password', (req, res) => {
    const newPassword = req.body.password
    const sentToken = req.body.token
    const otp = req.body.otp
    console.log("pass tok",newPassword,sentToken)

    userModel.findOne({ resetToken: sentToken ,otp:otp,expireToken:{$gt:Date.now()} })
        .then(user => {
            console.log(user)
            if (!user) {
                return res.status(422).json({ error: "Try again session expired" })
            }
                user.password = newPassword
                user.resetToken = undefined
                user.otp = undefined
                user.expireToken = undefined
                user.save().then((saveduser) => {
                    res.json({ message: "password updated success" })
                })
       
         
        }).catch(err => {
            console.log(err)
        })
})

router.post('/changePassword',(req, res) => {
  
    const {newPassword,oldPassword,username} = req.body
    console.log("pass tok",newPassword,oldPassword)

    userModel.findOne({ name:username })
        .then(user => {
            console.log(user)
            if (user && ( user.matchPassword(oldPassword))) {
                user.password = newPassword
                user.save().then((saveduser) => {
                    res.json({ message: "password updated success" })
                })
            }
         else{
            return res.status(422).json({ error: "User dont exists" })

         }
       
        
        }).catch(err => {
            console.log(err)
        })
})


router.get("/profile_by_name", async (req, res) => {
    // let type = req.query.type
    let profileName = req.query.id

    // console.log("req.query.id", req.query.id)

    // console.log("productIds", productIds)
    //we need to find the product information that belong to product Id 
    try {
        const profile = await userModel.find({ name: profileName })

        res.send(profile)
        console.log(profile[0])
    } catch (error) {
        res.json({ message: error })
    }

});

router.put("/updateProfile",upload.single('profileImage'), (req, res) => {
    const { name, email,phone,dob} = req.body;
    var profilePic= req.file.path;
    var profileImg=profilePic?profilePic:null;

    console.log("data", profilePic)
    // const newblog = new userModel(data);

    userModel.updateOne(
        {
            name: name,
            email: email,
            phone:phone,
            dob:dob,
            profileImg:profileImg
        })
        .then((data) => {
            console.log(data)
            res.json(data)

        })
        .catch((error) => {
            console.log(error)
        })
})







module.exports = router