const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

// /books
router.route("/").get(getAllBooks).post(verifyTokenAndAdmin, createBook);

// /books/:id
router
  .route("/:id")
  .get(getBookById)
  .put(updateBook, verifyTokenAndAdmin)
  .delete(deleteBook, verifyTokenAndAdmin);

module.exports = router;
