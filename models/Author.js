const mongoose = require("mongoose");
const Joi = require("joi");

const AuthorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    birthYear: {
      type: Number, 
      required: true,
      trim: true,
      
      
      
    },
    nationality: {
      type: String, 
      required: true,
      minlength: 2,
      maxlength:50
    },
  },
  { timestamps: true } 
);

const Author = mongoose.model("Author", AuthorSchema);
const validatorCreateAuthor=(object)=>{
  const schema = Joi.object({
      name: Joi.string().trim().min(3).max(50).required(),
      birthYear: Joi.number().integer().required(),
      nationality: Joi.string().trim().min(2).max(50).required(),
    });
  
    return schema.validate(object);
}
const validatorUpdateAuthor=(object)=>{
  const schema = Joi.object({
      name: Joi.string().trim().min(3).max(50),
      birthYear: Joi.number().integer(),
      nationality: Joi.string().trim().min(2).max(50),
    });
  
    return schema.validate(object);
}
module.exports = { Author,validatorCreateAuthor,validatorUpdateAuthor };
