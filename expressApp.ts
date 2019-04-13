import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import SignUp from "./handlers/signup";
import Test from "./handlers/test";

// const {jwtCheck} = require("./identityManagement");

class App {
  public app : any;
  public signUp : SignUp;
  public test : Test;

  constructor() {
    this.app = express();
    this._setConfig();
    this._setMongoConfig();

    this.signUp = new SignUp();
    this.test = new Test();


    this.routes();
  }

  private _setConfig() {
    // Middleware
    this.app.use(bodyParser.json());
    this.app.use(cors());
    // this.app.use(jwtCheck);
  }

  private _setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/collectorsAtlas', {useNewUrlParser: true});
  }

  public routes() {
    this.app.post("/signup", this.signUp.createNewUser);


    // See the db
    this.app.get("/getUsers", this.test.getUsers);
    this.app.get("/getLogin", this.test.getLogin);
  }
}



export default new App().app;
