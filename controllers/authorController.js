var exceptionHandler = require('express-exception-handler').wrap
const {Author,validatorCreateAuthor,validatorUpdateAuthor}=require('../models/Author');
/**
 * @desc Get All Authors
 * @route /api/Authors
 * @method GET 
 * @access public
 */
module.exports.getAllAuthors=exceptionHandler(async(req, res) => {
    const {pageNumber,authorsPerPage}=req.query;
    const authorList=await Author.find().skip((pageNumber-1)*authorsPerPage).limit(authorsPerPage);
    res.status(200).json(authorList)})
/**
 * @desc Get A Author By id
 * @route /api/Authors/:id
 * @method GET 
 * @access public
 */
module.exports.getAuthorById=exceptionHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  })
/**
 * @desc Create a new Author
 * @route /api/Authors
 * @method POST 
 * @access private (only admin)
 */
module.exports.createAuthor=exceptionHandler(async (req, res) => {
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
     
  })
/**
 * @desc Edit a Author
 * @route /api/Authors/:id
 * @method PUT 
 * @access private (only admin)
 */

module.exports.updateAuthor=exceptionHandler(async (req, res) => {
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
   
  })
/**
 * @desc Delete a Author
 * @route /api/Authors/:id
 * @method DELETE 
 * @access private (only admin)
 */
module.exports.deleteAuthor=exceptionHandler(async(req, res) => {
    
    
    const author = await Author.findById({_id: req.params.id});
  if (author) {
      await Author.findByIdAndDelete({_id: req.params.id})
      return res.status(200).json({message:"The Author has been deleted"})
  }
  else{
      return res.status(404).json({message:"The Author not found"})
    }
  
  })
