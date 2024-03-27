const { validatorUpdateUser, User } = require("../models/User");
const bcrypt = require("bcryptjs");
var exceptionHandler = require("express-exception-handler").wrap;

/**
 * @desc Get All Users
 * @route /api/users
 * @method GET
 * @access private (only Admin)
 */
module.exports.getAllUsers=exceptionHandler(async (req, res) => {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  })
/**
 * @desc Get User
 * @route /api/users/:id
 * @method GET
 * @access private (only Admin & user himself)
 */
module.exports.getUserById=exceptionHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  })
/**
 * @desc Edit a user
 * @route /api/users/:id
 * @method PUT
 * @access private
 */
module.exports.updateUser=exceptionHandler(async (req, res) => {
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
/**
 * @desc Delete User
 * @route /api/users/:id
 * @method GET
 * @access private (only Admin & user himself)
 */
module.exports.deleteUser=exceptionHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.status(200).json({ message: "User deleted succusefly" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  })