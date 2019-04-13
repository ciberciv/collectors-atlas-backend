import mongoose, { model } from "mongoose";
import userSchema from "./schemas/userSchema";
import loginSchema from "./schemas/loginSchema";
import collectionSchema from "./schemas/collectionSchema";

class Database {
    public users : any;  // I intend to come back to this and put the correct types
    public login : any;  // but that will be once I feel comfortable with TS and mongoose
    public collections : any;

    constructor() {
        this.users = model("Users", userSchema);
        this.login = model("Login", loginSchema);
        this.collections = model("Collections", collectionSchema);
    }

    
}

export const db = new Database();