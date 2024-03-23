const express = require("express");
const { validatorUpdateUser, User } = require("../models/User");
const bcrypt = require("bcryptjs");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const router = express.Router();
var exceptionHandler = require("express-exception-handler").wrap;

/**
 * @desc Edit a user
 * @route /users/:id
 * @method PUT
 * @access private
 */
router.put(
  "/:id",
  verifyTokenAndAuthorization,
  exceptionHandler(async (req, res) => {
    const { error } = validatorUpdateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message }); // kt3ny 400 Bad Request
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        email: req.body.email,
        password: req.body.password,
        userName: req.body.userName,
      },
      { new: true }
    ).select("-password");
    res.status(200).json(updateUser);
  })
);
/**
 * @desc Get All Users
 * @route /users
 * @method GET
 * @access private (only Admin)
 */
router.get(
  "/",
  verifyTokenAndAdmin,
  exceptionHandler(async (req, res) => {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  })
);
/**
 * @desc Get User
 * @route /users/:id
 * @method GET
 * @access private (only Admin & user himself)
 */
router.get(
  "/:id",
  verifyTokenAndAuthorization,
  exceptionHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  })
);
/**
 * @desc Delete User
 * @route /users/:id
 * @method GET
 * @access private (only Admin & user himself)
 */
router.delete(
  "/:id",
  verifyTokenAndAuthorization,
  exceptionHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.status(200).json({ message: "User deleted succusefly" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  })
);

module.exports = router;
