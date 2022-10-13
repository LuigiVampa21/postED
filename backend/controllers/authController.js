const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const newUser = await User.create({ email, password });
  if (!newUser) {
    throw new Error("Sorry the server was not able to sign up");
  }
  res.status(201).json({
    data: newUser,
  });
};

exports.login = async (req, res) => {
  // const { id } = req.params;
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("Sorry no user found!");
  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) throw new Error("Wrong password!");
  const token = jwt.sign(
    { email: user.email, userID: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  res.status(200).json({
    data: user,
    token,
    expiring: process.env.JWT_EXPIRES_IN_SEC,
  });
};
