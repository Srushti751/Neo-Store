const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        // index:true,sparse:true
    
    },
    email:{
        type:String,
        // required:[true,"Email is required"]
    },
    password:{
        type:String,
        // required:[true,"Password is required"]
    },
    profileImg:{
      type:String,
      //  index:true,sparse:true
    },
    phone:{
      type:Number
    },
    dob:{
      type:Date
    },
    resetToken:String,
    expireToken:Date,
    otp:String,
    isAdmin:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

userSchema.pre("save", async function (next) {
    if (!this.isModified) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

const userModel = mongoose.model('user',userSchema)

module.exports = userModel;