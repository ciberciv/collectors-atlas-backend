import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import SignUp from "./handlers/signup";
import SignIn from "./handlers/signin";
import Test from "./handlers/test";
import Profile from "./handlers/profile";

// const {jwtCheck} = require("./identityManagement");

class App {
  public app : any;
  public signUp : SignUp;
  public signIn : SignIn;
  public profile : Profile;
  public test : Test;

  constructor() {
    this.app = express();
    this._setConfig();
    this._setMongoConfig();

    this.signUp = new SignUp();
    this.signIn = new SignIn();
    this.profile = new Profile();
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
    this.app.post("/signin", this.signIn.signInUser);
    this.app.delete("/profile", this.profile.deleteUser);


    // See the db
    this.app.get("/getUsers", this.test.getUsers);
    this.app.get("/getLogin", this.test.getLogin);
  }
}



export default new App().app;
