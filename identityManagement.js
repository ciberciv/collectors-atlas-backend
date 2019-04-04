const expressjwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const {jwtKey} = require("./secretValues");


// Check for correct credentials before loading a route
const jwtCheck = expressjwt({
    secret: jwtKey,
    getToken: (req) => {
      if (req.headers.authorization) {
        return req.headers.authorization.slice(7);
      } else {
        return null;
      }
    }
  }).unless({path: [
    "/register",
    "/signup",
    "/login",
    "/signin"
  ]});

// Get jwt from local storage
const getUser = (token) => {
  return jwt.verify(token, jwtKey, (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded.username;
    }
  })
}

module.exports = {
  jwtCheck: jwtCheck,
  jwtKey: jwtKey,
  getUser: getUser
}
