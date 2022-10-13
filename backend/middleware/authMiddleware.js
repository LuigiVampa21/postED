const jwt = require("jsonwebtoken");

exports.checkToken = async (req, res, next) => {
  const token = await req.headers.authorizations.split(" ")[1];
  // const token = await req.headers.authorization.split(" ")[2];
  console.log(token);
  if (!token)
    throw new Error("Sorry you are not authorized to access this route");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { email, userID } = decoded;
  req.userData = { email, userID };
  if (!decoded) throw new Error("Sorry your token is not valid anymore");
  next();
};
