const User = require("../models/user.model");
const cookieToken = require("../utils/cookieToken");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");
// const mailHelper = require("../utils/emailHelper");
const crypto = require("crypto");

// signup user
exports.signup = async (req, res) => {
  try {
    let result;
    // if (!req.files) {
    //   res.status(400).send({
    //     success: false,
    //     message: "Photo is required",
    //   });
    // }
    // if (req.files) {
    //   let file = req.files.photo;
    //   result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
    //     folder: "users",
    //     width: 150,
    //     crop: "scale",
    //   });
    // }
    // console.log(req.body);
    const { name, email, password } = req.body;
    if (!email || !name || !password) {
      res.status(400).send({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      // photo: {
      //   id: result.public_id,
      //   secure_url: result.secure_url,
      // },
    });

    cookieToken(user, res);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// signin user
exports.signin = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(404).send({
        success: false,
        message: "You don't have an account, try sgning up",
      });
    }

    const isValidatedUser = await user.isValidatedPassword(password);

    if (!isValidatedUser) {
      res.status(401).send({
        success: false,
        message: error.message,
      });
    }

    cookieToken(user, res);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// signout user
exports.signout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout success",
  });
};

// forgot password
exports.forgotpassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({
      success: false,
      message: "User doesn't exist",
    });
  }

  const forgotToken = await user.getForgotPasswordToken();

  await user.save({ validateBeforeSave: false });

  const myUrl = `${req.protocol}//${req.get(
    "host"
  )}/api/v1/password/reset/${forgotToken}`;

  const message = `Copy paste this link to your url and hit enter \n\n ${myUrl}`;

  try {
    await mailHelper({
      email: user.email,
      subject: `Pen Tales - password reset`,
      message: message,
    });

    res.status(200).json({
      success: true,
      message: "Reset email sent to your email",
    });
  } catch (error) {
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    user.save({ validateBeforeSave: false });
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// reset password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;
  const encryToken = await crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: encryToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400).json({
      success: false,
      message: "Token is invalid or expired..!!",
    });
  }

  if (password !== confirmPassword) {
    res.status(400).json({
      success: false,
      message: "Password and Confirm Password do not match",
    });
  }

  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;
  await user.save();
  user.password = undefined;

  res.status(201).json(user);
};

// get signed in user details
exports.getIsLoggedInUserDetails = async (req, res, next) => {
  const user = await User.findById({ _id: req.userId });
  user.password = undefined;
  res.status(200).send(user);
};

// update password
exports.updatePassword = async (req, res, next) => {
  const { password, newPassword } = req.body;

  const user = await User.findById({ _id: req.userId }).select("+password");

  if (!user.isValidatedPassword(password)) {
    res.status(400).json({
      success: false,
      message: "Please enter correct password",
    });
  }

  user.password = newPassword;
  await user.save();

  cookieToken(user, res);
};

// update user profile
exports.updateUserDetails = async (req, res, next) => {
  const { name, email } = req.body;

  // validate request data
  if (!name && !email && !req.files) {
    res.status(400).json({
      success: false,
      message: "Provide some information to update",
    });
  }

  let newData = {};

  if (name) {
    newData.name = name;
  }

  if (email) {
    newData.email = email;
  }

  // image update
  if (req.files) {
    const user = await User.findById({ _id: req.userId });
    const imageId = user.photo.id;
    await cloudinary.v2.uploader.destroy(imageId);
    const result = await cloudinary.v2.uploader.upload(
      req.files.photo.tempFilePath,
      { folder: "users", width: 150, crop: "scale" }
    );
    newData.photo = {
      id: result.public_id,
      secure_url: result.secure_url,
    };
  }

  const updatedUser = await User.findByIdAndUpdate(
    { _id: req.userId },
    newData,
    { new: true, runValidators: true, useFindAndModify: false }
  );

  updatedUser.password = undefined;

  return res.status(201).json({
    success: true,
    user: updatedUser,
  });
};
