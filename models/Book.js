const mongoose=require("mongoose");
const Joi = require("joi");

const BookSchema=new mongoose.Schema({
    title:{
        type:String,
        required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    
    author: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Author"
    },
    genre: {
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:90
    },
    year: {
        type:Number,
        required:true,
        min:0
    },
    cover:{
        type:String,
        required:true,
        enum:["hard cover","soft cover"]
    }
},{timestamps:true})
const Book=mongoose.model("Boook",BookSchema);
const validatorCreateBook=(object)=>{
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(50).required(),
        author: Joi.string().required(),
        genre: Joi.string().trim().min(3).max(90).required(),
        year: Joi.number().min(0).required().integer(),
        cover: Joi.valid("hard cover", "soft cover")
      });
    
      return schema.validate(object);
}
const validatorUpdateBook=(object)=>{
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(50),
        author: Joi.string(),
        genre: Joi.string().trim().min(3).max(90),
        year: Joi.number().min(0).integer(),
        cover: Joi.valid("hard cover", "soft cover")
      });
    
      return schema.validate(object);
}
module.exports={Book,validatorCreateBook,validatorUpdateBook}