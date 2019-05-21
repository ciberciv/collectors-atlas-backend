import {Request, Response} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {jwtKey} from "../secretValues";
import {db} from "../database";

class SignIn {
  public signInUser = (req : Request, res : Response) => {
    const {username, password} = req.body;

    if (!username || !password) {
      return res.status(400).json("Fill all the data");
    }

    db.users.findOne({username: username}).select("email")
      .then((fetchedEmail : any) => db.login.findOne({email: fetchedEmail.email}).select("password"))
      .then((dbEntry : any) => {        
        const fetchedPassword = dbEntry.password;
        
        bcrypt.compare(password, fetchedPassword).then((isMatch : Boolean) => {
          if (isMatch) {
            jwt.sign({username: username}, jwtKey, (error : Error, token : String) => {
              if (error) {
                return res.status(400).json("Error on generating session");
              } else {
                return res.status(200).json(token);
              }
            })
          } else {
            res.status(400).json("Wrong credentials");
          }
        }).catch(() => res.status(400).json("Something went wrong"))
      }).catch(() => res.status(403).json("Wrong credentials"))
  }
}

export default SignIn;