import app from "./expressApp"; /*
import handleSignIn from "./handlers/signin.js";
import handleSignUp from "./handlers/signup.js";
import handleCollection from "./handlers/collection.js";
import handleProfile from "./handlers/profile.js"; */



// Handlers
/* app.post("/signin", (req : Request, res : Response) => handleSignIn.signInUser(req, res))
app.post("/signup", (req : Request, res : Response) => handleSignUp.createNewUser(req, res))
app.put("/collection", (req : Request, res : Response) => handleCollection.createNewCollection(req, res))
app.get("/collection", (req : Request, res : Response) => handleCollection.getUserCollections(req, res))
app.delete("/profile", (req : Request, res : Response) => handleProfile.deleteUser(req, res)) */

// Start app
app.listen(3000, () => console.log("App listening on port 3000"));
