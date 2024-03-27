var exceptionHandler = require("express-exception-handler").wrap;
const {
  Book,
  validatorCreateBook,
  validatorUpdateBook,
} = require("../models/Book");

/**
 * @desc Get All books
 * @route /api/books
 * @method GET
 * @access public
 */
module.exports.getAllBooks = exceptionHandler(async (req, res) => {
  const { genreQuery } = req.query;
  let books;
  if (genreQuery) {
    books = await Book.find({ genre: { $eq: genreQuery } }).populate("author", [
      "-_id",
      "name",
      "nationality",
    ]);
  } else {
    books = await Book.find().populate("author", [
      "-_id",
      "name",
      "nationality",
    ]);
  }
  res.status(200).json(books);
});
/**
 * @desc Get A book By id
 * @route /api/books/:id
 * @method GET
 * @access public
 */
module.exports.getBookById = exceptionHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate("author");
  if (!book) {
    res.status(404).json({ message: "book not found" });
  }
  res.status(200).json(book);
});
/**
 * @desc Create a new book
 * @route /api/books
 * @method POST
 * @access private (only admin)
 */
module.exports.createBook = exceptionHandler(async (req, res) => {
  const { error } = validatorCreateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    year: req.body.year,
    cover: req.body.cover,
  });
  let result = await book.save();
  res.status(201).json(result);
});
/**
 * @desc Edit a book
 * @route /api/books/:id
 * @method PUT
 * @access private (only admin)
 */
module.exports.updateBook = exceptionHandler(async (req, res) => {
  const { error } = validatorUpdateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const updatedBook = await Book.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      year: req.body.year,
      cover: req.body.cover,
    },
    { new: true }
  );
  if (updatedBook) {
    return res.status(200).json(updatedBook);
  } else {
    return res.status(404).json({ message: "The Book not found" });
  }
});
/**
 * @desc Delete a book
 * @route /api/books/:id
 * @method DELETE
 * @access private(only admin)
 */
module.exports.deleteBook = exceptionHandler(async (req, res) => {
  const book = await Book.findById({ _id: req.params.id });
  if (book) {
    await Book.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).json({ message: "The Book has been deleted" });
  } else {
    return res.status(404).json({ message: "The Book not found" });
  }
});
