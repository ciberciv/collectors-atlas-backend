import {Request, Response} from "express";
import bcrypt from "bcrypt";
import {db} from "../mongoDatabase";
import saltRounds from "../secretValues";

class SignUp {
  public createNewUser = (req : Request, res : Response) => {
    const {username, email, password, passwordRep} = req.body;
  
    if (!username || !email || !password || !passwordRep) {
      return res.status(400).json("Fill all the data");
    }
  
    if (password != passwordRep) {
      return res.status(400).json("Password missmatch")
    }
  
    const hash = bcrypt.hash(password, saltRounds).then(hash => {
      db.users.startSession()
        .then((session : any) => {
          session.startTransaction()
          
          return db.users.create([{
            username: username,
            email: email,
            password: password
          }],
          {session: session})
          .then(() => {
            return db.login.create([{
              email: email,
              password: hash
            }],
            {session: session})
            .then(() => session.commitTransaction()).then(() => session.endSession())
          }).catch(() => session.abortTransaction())
        }).then(res.json("Cool"))
  
      /*
      db.transaction(trx => {
        trx.insert({
          email: email,
          password: hash
        })
          .into("login")
          .returning("email")
          .then(registeredEmail => {
            return trx.insert({
                email: registeredEmail[0],
                username: username,
                joined: new Date()
              })
                .into("users")
                .returning("*")
                .then(user => {
                  res.status(200).json(user[0]);
                })
          }).then(trx.commit).catch(trx.rollback)
      }).catch(err => res.status(400).json("Something went wrong"))
      */
    }).catch(err => res.status(400).json("Please, try again"));
    
  }
}

export default SignUp;
