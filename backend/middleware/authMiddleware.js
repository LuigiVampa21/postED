const jwt = require("jsonwebtoken");

exports.checkToken = async (req, res, next) => {
  const token = await req.headers.authorizations.split(" ")[1];
  if (!token)
    throw new Error("Sorry you are not authorized to access this route");
  const isTokenValid = jwt.verify(token, process.env.JWT_SECRET);
  if (!isTokenValid) throw new Error("Sorry your token is not valid anymore");
  next();
};
