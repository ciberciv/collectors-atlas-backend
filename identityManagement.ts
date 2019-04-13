import expressjwt from "express-jwt";
import jwt from "jsonwebtoken";
import {jwtKey} from "./secretValues";
import {Request} from "express";

class IdentityManagement {
  public jwtCheck = expressjwt({
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

  public getUserFromToken = (token : string) => {
    return jwt.verify(token, jwtKey, (err : Error, decoded : any) => {
      if (err) {
        return null;
      } else {
        return decoded.username;
      }
    })
  }

  public getUserFromRequest = (request : Request) => {
    const token = request.headers.authorization.slice(7);
    return this.getUserFromToken(token);
  }
}

export default new IdentityManagement();
