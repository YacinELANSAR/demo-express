const express = require("express");

const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const { getAllUsers, updateUser, deleteUser, getUserById } = require("../controllers/userController");
const router = express.Router();

router.route("/").get(verifyTokenAndAdmin,getAllUsers)
router.route("/:id").get(verifyTokenAndAuthorization,getUserById).put(verifyTokenAndAuthorization,updateUser).delete(verifyTokenAndAuthorization,deleteUser)

module.exports = router;
