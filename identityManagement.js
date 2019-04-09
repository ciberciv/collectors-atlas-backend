const expressjwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const {jwtKey} = require("./secretValues");


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

const getUserFromToken = (token) => {
  return jwt.verify(token, jwtKey, (err, decoded) => {
    if (err) {
      return null;
    } else {
      return decoded.username;
    }
  })
}

const getUserFromRequest = (request) => {
  const token = request.headers.authorization.slice(7);
  return getUserFromToken(token);
}

module.exports = {
  jwtCheck: jwtCheck,
  jwtKey: jwtKey,
  getUserFromRequest: getUserFromRequest
}
