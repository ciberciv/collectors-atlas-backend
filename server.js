const {app} = require("./expressApp");
const handleSignIn = require("./handlers/signin");
const handleSignUp = require("./handlers/signup");
const handleCollection = require("./handlers/collection");

// Handlers
app.post("/signin", (req, res) => handleSignIn.post(req, res))
app.post("/signup", (req, res) => handleSignUp.post(req, res))
app.put("/collection", (req, res) => handleCollection.put(req, res))
app.get("/collection", (req, res) => handleCollection.get(req, res))

// Start app
app.listen(3000);
