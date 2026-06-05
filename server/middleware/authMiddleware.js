const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  //to check if token exist and start with beareeer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "No token, not authorized",
    });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // this  keeps req.user.id available for all protected routes
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token Invalid or Expired" });
  }
};
module.exports = verifyToken;
