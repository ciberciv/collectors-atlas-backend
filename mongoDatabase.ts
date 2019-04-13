import { model } from "mongoose";
import userSchema from "./schemas/userSchema";

const loginSchema = require("./schemas/loginSchema");
const collectionSchema = require("./schemas/collectionSchema");

class Database {
    private users: any;  // I intend to come back to this and put the correct types
    private login: any;  // but that will be once I feel comfortable with TS and mongoose
    private collections: any;

    constructor() {
        this.users = model("Users", userSchema);
        this.login = model("Users", loginSchema);
        this.collections = model("Users", collectionSchema);
    }
}