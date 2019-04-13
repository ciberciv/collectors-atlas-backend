import {Request, Response} from "express";
import {db} from "../mongoDatabase";

class Test {
  public getUsers = (req : Request, res : Response) => {
    db.users.find({}, (error : Error, user : any) => {
      if (error) {
        res.send(error);
      }
  
      res.json(user);
    });
  }

  public getLogin = (req : Request, res : Response) => {
    db.login.find({}, (error : Error, login : any) => {
      if (error) {
        res.send(error);
      }

      res.json(login);
    })
  }
}

export default Test;