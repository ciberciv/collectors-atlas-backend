import {Request, Response} from "express";
import bcrypt from "bcrypt";
import {db} from "../mongoDatabase";
import {saltRounds} from "../secretValues";

class SignUp {
  public createNewUser = (req : Request, res : Response) => {
    const {username, email, password, passwordRep} = req.body;
  
    if (!username || !email || !password || !passwordRep) {
      return res.status(400).json("Fill all the data");
    }
  
    if (password != passwordRep) {
      return res.status(400).json("Password missmatch")
    }
  
    bcrypt.hash(password, saltRounds).then((hash : String) => {
      let session : any = null;

      return db.users.startSession()
        .then((_session : any) => {
          session = _session;

          session.startTransaction();

          const userToAdd = new db.users({
            username: username,
            email: email,
            joined: new Date()
          });
          
          userToAdd.save({session: session})
            .then(() => {
              const logInfoToAdd = new db.login({
                email: email,
                password: hash
              })

              logInfoToAdd.save({session: session})
            })
        })
        .then(() => session.commitTransaction()).catch(() => session.abortTransaction())
        .then(() => db.users.findOne({username: username}).session(session))
        .then((fetchedUser : any) => res.json(fetchedUser))
    })
    
  }
}

export default SignUp;
