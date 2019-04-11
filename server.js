const {app} = require("./expressApp");
const handleSignIn = require("./handlers/signin");
const handleSignUp = require("./handlers/signup");
const handleCollection = require("./handlers/collection");
const handleProfile = require("./handlers/profile");

// Handlers
app.post("/signin", (req, res) => handleSignIn.signInUser(req, res))
app.post("/signup", (req, res) => handleSignUp.createNewUser(req, res))
app.put("/collection", (req, res) => handleCollection.createNewCollection(req, res))
app.get("/collection", (req, res) => handleCollection.getUserCollections(req, res))
app.delete("/profile", (req, res) => handleProfile.deleteUser(req, res))

// Start app
app.listen(3000);
