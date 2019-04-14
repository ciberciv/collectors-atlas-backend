import {Request, Response} from "express";
import {getUserFromRequest} from "../identityManagement";
import {db} from "../database";

class Collections {
  public getUserCollections = (req : Request, res : Response) => {
    const owner : any = getUserFromRequest(req);
  
    if (!owner) {
      return res.status(403).json("No permission");
    }

    db.collections.find({owner: owner})
      .then((collections : any) => {
        const collectionNames = collections.map((collection : any) => collection.name)

        res.status(200).json(collectionNames);
      })
  }

  public createNewCollection = (req : Request, res : Response) => {
    const {game, name}= req.body;
    const owner : any = getUserFromRequest(req);
  
    if (!owner) {
      return res.status(400).json("Something went wrong");
    }
  
    let session : any = null;

    const collectionToAdd = new db.collections({
      owner: owner,
      game: game,
      name: name
    });

    collectionToAdd.save()
      .then(res.status(200).json(collectionToAdd))
  }
}

export default Collections;