const express = require("express");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const {
  getAllAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");
const router = express.Router();

// /books
router.route("/").get(getAllAuthors).post(verifyTokenAndAdmin, createAuthor);

// /books/:id
router
  .route("/:id")
  .get(getAuthorById)
  .put(verifyTokenAndAdmin, updateAuthor)
  .delete(verifyTokenAndAdmin, deleteAuthor);

module.exports = router;
