// middleware/authenticateJWT.js
const jwt = require("jsonwebtoken");
const apiResponse = require("../utils/apiResponse");

const authenticateJWT = (req, res, next) => {
  return (req, res, next) => {
    const token = req.header("Authorization") || req.query;
    // console.log("hghfhggjhgghf  ", token);
    if (!token) {
      return res
        .status(401)
        .json(apiResponse(false, "Missing authorization token"));
    }

    const secretKey = "your_secret_key"; // Replace with a strong secret key
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json(apiResponse(false, "Invalid token"));
      }

      // if (!roles.includes(user.role)) {
      //   return res.status(403).json(apiResponse(false, "Access denied"));
      // }

      req.user = user;
      next();
    });
  };
};

module.exports = authenticateJWT;
