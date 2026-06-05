const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//generate token
const generateToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

//post /api/auth/register
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //to check if email already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    //create user
    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id), //return token
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later" });
  }
};

//post /api/auth/login
const login = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //return token
    res.json({
      message: "Login successful",
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later",
    });
  }
};
module.exports = { register, login };
