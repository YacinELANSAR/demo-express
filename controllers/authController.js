const { validatorCreateUser, User, validatorLogginUser } = require("../models/User");
const exceptionHandler = require('express-exception-handler').wrap
const bcrypt=require('bcryptjs');

/**
 * @desc Register a new user
 * @route /Auth
 * @method POST 
 * @access public
 */
module.exports.register=exceptionHandler(async(req,res)=>{
    const {error}=validatorCreateUser(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    let user=await User.findOne({email:req.body.email});
    if (user) {
        return res.status(400).json({message:"User already registered"});
    }
    const salt=await bcrypt.genSalt(10);
    req.body.password=await bcrypt.hash(req.body.password,salt)
    user=new User (
        {
        email:req.body.email,
        userName:req.body.userName,
        password:req.body.password,
        
    }
    // req.body
    )
    
    const result = await user.save();
    const token=user.generateToken()
    const {password,...other}=result._doc;
    return res.status(201).json({...other,token});
})

/**
 * @desc login a user
 * @route /Auth
 * @method POST 
 * @access public
 */

module.exports.login=exceptionHandler(async(req,res)=>{
    const {error}=validatorLogginUser(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    let user=await User.findOne({email:req.body.email});
    if (!user) {
        return res.status(400).json({message:"Invalid email or password"});
    }
    isPasswordMatch=await bcrypt.compare(req.body.password,user.password)
    if (!isPasswordMatch) {
        return res.status(400).json({message:"Invalid email or password"});
    }
    const token=user.generateToken()
    const {password,...other}=user._doc;
     res.status(200).json({...other,token});
})