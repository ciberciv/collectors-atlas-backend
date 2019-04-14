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

  public getAllCollections = (req : Request, res : Response) => {
    db.collections.find({}, (error : Error, collection : any) => {
      if (error) {
        res.send(error);
      }

      res.json(collection);
    })
  }

  public deleteAllCollections = (req : Request, res : Response) => {
    db.collections.deleteMany({}, (error : Error) => {
      if (error) {
        res.send(error);
      }

      res.json("Cool");
    })
  }

  public deleteAllUsers = (req : Request, res : Response) => {
    db.users.deleteMany({}, (error : Error) => {
      if (error) {
        res.send(error);
      }

      res.json("Cool");
    })
  }

  public deleteAllLogin = (req : Request, res : Response) => {
    db.login.deleteMany({}, (error : Error) => {
      if (error) {
        res.send(error);
      }

      res.json("Cool");
    })
  }
}

export default Test;