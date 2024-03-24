const express = require("express");
var exceptionHandler = require('express-exception-handler').wrap
const {Author,validatorCreateAuthor,validatorUpdateAuthor}=require('../models/Author');
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const router = express.Router();

  
/**
 * @desc Get All Authors
 * @route /Authors
 * @method GET 
 * @access public
 */
router.get("/", exceptionHandler(async(req, res) => {
  const {pageNumber,authorsPerPage}=req.query;
  const authorList=await Author.find().skip((pageNumber-1)*authorsPerPage).limit(authorsPerPage);
  res.status(200).json(authorList)})
);
/**
 * @desc Get A Author By id
 * @route /Authors/:id
 * @method GET 
 * @access public
 */
router.get("/:id", exceptionHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) {
    res.status(200).json(author);
  } else {
    res.status(404).json({ message: "Author not found" });
  }
}));
/**
 * @desc Create a new Author
 * @route /Authors
 * @method POST 
 * @access private (only admin)
 */
router.post("/", verifyTokenAndAdmin,exceptionHandler(async (req, res) => {
  const {error} = validatorCreateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
    const author = new Author({
      name: req.body.name,
      birthYear: req.body.birthYear,
       nationality:req.body.nationality,
    });
    let result=await author.save()
    res.status(201).json(result);
   
}));


/**
 * @desc Edit a Author
 * @route /Authors/:id
 * @method PUT 
 * @access private (only admin)
 */
router.put("/:id", verifyTokenAndAdmin,exceptionHandler(async (req, res) => {
  const { error } = validatorUpdateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
    const author = await Author.findOneAndUpdate(
      { _id: req.params.id }, 
      {
        name: req.body.name,
        birthYear: req.body.birthYear,
        nationality: req.body.nationality,
      },
      { new: true } 
    );
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
 
}));

/**
 * @desc Delete a Author
 * @route /Authors/:id
 * @method DELETE 
 * @access private (only admin)
 */
router.delete("/:id",verifyTokenAndAdmin, exceptionHandler(async(req, res) => {
    
    
  const author = await Author.findById({_id: req.params.id});
if (author) {
    await Author.findByIdAndDelete({_id: req.params.id})
    return res.status(200).json({message:"The Author has been deleted"})
}
else{
    return res.status(404).json({message:"The Author not found"})
  }

}));

module.exports = router;
