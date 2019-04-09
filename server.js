const {app} = require("./expressApp");
const handleSignIn = require("./handlers/signin");
const handleSignUp = require("./handlers/signup");
const handleCollection = require("./handlers/collection");

// Handlers
app.post("/signin", (req, res) => handleSignIn.signInUser(req, res))
app.post("/signup", (req, res) => handleSignUp.createNewUser(req, res))
app.put("/collection", (req, res) => handleCollection.createNewCollection(req, res))
app.get("/collection", (req, res) => handleCollection.getUserCollections(req, res))

// Start app
app.listen(3000);
