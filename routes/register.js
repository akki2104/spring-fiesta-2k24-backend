const User = require("../models/user");
const { Router } = require("express");
const bodyParser = require("body-parser");

const router = Router();
router.use(bodyParser.json());

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User Already Exists" });
    }
    await User.create({
      email,
      password,
    });

    return res.redirect("/login");
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      error: "Incorrect Email or Password",
    });
  }
});

module.exports = router;