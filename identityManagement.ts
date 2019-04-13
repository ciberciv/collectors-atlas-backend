import expressjwt from "express-jwt";
import jwt from "jsonwebtoken";
import {jwtKey} from "./secretValues";
import {Request} from "express";

const jwtCheck = expressjwt({
  secret: jwtKey,
  getToken: (req : Request) => {
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

const getUserFromToken = (token : string) => {
  return jwt.verify(token, jwtKey, (err : Error, decoded : any) => {
    if (err) {
      return null;
    } else {
      return decoded.username;
    }
  })
}

const getUserFromRequest = (request : Request) => {
  if (request.headers.authorization) {
    const token = request.headers.authorization.slice(7);
    return getUserFromToken(token);
  }
}


export {jwtCheck, getUserFromToken, getUserFromRequest};
