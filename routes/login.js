const User = require("../models/user");
const { Router } = require("express");
const bodyParser = require("body-parser");
const bcryptjs = require("bcryptjs");
const { createTokenForUser } = require("../controllers/authentication");

const router = Router();
router.use(bodyParser.json());

router.get("/", (req, res) => {
  return res.render("login");
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ error: "User does not exist" }, { status: 400 });
    }
    console.log("user exists");

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }
    console.log(user);

    const token = createTokenForUser(user);

    return res.json({ token: token, message: "successful" });
  } catch (error) {
    console.log(error);
    return res.status(404).json("/", {
      error: "Incorrect Email or Password",
    });
  }
});

module.exports = router;
