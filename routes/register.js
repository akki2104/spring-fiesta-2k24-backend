const User = require("../models/user");
const { Router } = require("express");
const bodyParser = require("body-parser");

const router = Router();
router.use(bodyParser.json());

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check college email
    const pattern = /^ui(20|21|22|23|24)(ec|cs)([0-8][1-9]|90)@iiitsurat\.ac\.in$/;

    // if the email matches the pattern
    if (!pattern.test(email)) {
      return res.status(400).json({ error: "Use College Email ID only" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User Already Exists" });
    }
    await User.create({
      email,
      password,
    });

    return res.status(200).json({
      messsage: "Register Successful",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error: "Incorrect Email or Password",
    });
  }
});

module.exports = router;
