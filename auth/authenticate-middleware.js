const jwt = require("jsonwebtoken");

const constants = require("../config/constants.js");

/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
module.exports = (req, res, next) => {
  // verify users are logged in
  const token = req.headers.authorization;
  const secret = constants.jwtSecret;

  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        // the token is invalid
        res.status(401).json({ you: "cannot pass!" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ you: "shall not pass! provide credentials" });
  }
};
