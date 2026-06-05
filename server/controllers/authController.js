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
      .json({ message: "Registration error: ", error: err.message });
  }
};

module.exports = { register };
