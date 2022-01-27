const {check,validationResult} = require('express-validator')

exports.validateEmployee =[
    check('name').trim().not().isEmpty().isLength({min:3}).withMessage('Name should be of minimum 3 letters'),
    check('email').isEmail().withMessage("Enter valid email eg:- 'xyz@gmail.com' "),
    check('password').isLength({ min: 8 }).withMessage("Password should have minimum 8 character "),

]

exports.validateData =(req,res,next)=>{

    const result = validationResult(req).array();
    if (!result.length) return next();


    const error = result[0].msg;
    res.json({success:false, message:error})
}
