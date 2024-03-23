const mongoose = require("mongoose");
const Joi = require("joi");
const jwt=require('jsonwebtoken');

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:15,
        maxlength:80,
        unique:true,
    },
    userName:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:80
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8,
        
    },
    isAdmin: {
        type: Boolean,
        default: false
      }
      
},{timestamps:true});

// Generate Token
UserSchema.methods.generateToken=function(){
    return jwt.sign({id:this._id,isAdmin:this.isAdmin},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRE});
}
// USER MODEL
const User=mongoose.model("User",UserSchema);

const validatorCreateUser=(object)=>{
    const schema = Joi.object({
        email: Joi.string().trim().min(15).max(80).required().email(),
        userName: Joi.string().min(5).max(80).required(),
        password: Joi.string().min(8).required(),
        
      });
    
      return schema.validate(object);
  }
const validatorUpdateUser=(object)=>{
    const schema = Joi.object({
        email: Joi.string().trim().min(15).max(80).email(),
        userName: Joi.string().min(5).max(80),
        password: Joi.string().min(8),
        
      });
      
      return schema.validate(object);
    }
const validatorLogginUser=(object)=>{
    const schema = Joi.object({
        email: Joi.string().trim().min(15).max(80).email(),
        password: Joi.string().min(8),
        
      });
      
      return schema.validate(object);
    }
module.exports={User,validatorCreateUser,validatorUpdateUser,validatorLogginUser}