import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {getUserFromRequest} from "../identityManagement";
import {db} from "../database";

class Profile {
  public deleteUser = (req : Request, res : Response) => {
    const username = getUserFromRequest(req);
    const password = req.body.password;
  
    if (!password) {
      return res.status(400).json("Please fill in your password");
    }

    db.users.findOne({username: username}).select("email")
      .then((fetchedEmail : any) => {
        const email = fetchedEmail.email;

        db.login.findOne({email: email}).select("password")
          .then((dbEntry : any) => {
            const fetchedPassword = dbEntry.password;

            bcrypt.compare(password, fetchedPassword).then((isMatch : Boolean) => {
              if (isMatch) {
                let session : any = null;

                db.users.startSession()
                .then((_session : any) => {
                  session = _session;

                  session.startTransaction();

                  db.users.findOneAndRemove({email: email}, {session: session}, (data : any) => {
                      db.login.findOneAndRemove({email: email}, {session: session})
                        .then(() => res.status(200).json("User deleted"))
                    })
                })
                .then(() => session.commitTransaction()).catch(() => session.abortTransaction())
              } else {
                res.json("Wrong credentials")
              }
            })
          })
      })
  }
}

export default Profile;