const User = require("../models/user");
const { Router } = require("express");
const bodyParser = require("body-parser");
const createTokenForUser = require("../controllers/authentication");

const router = Router();
router.use(bodyParser.json());

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check college email
    const pattern = /^ui(20|21|22|23)(ec|cs)([0-8][0-9]|90)@iiitsurat\.ac\.in$/;

    // if the email matches the pattern
    if (!pattern.test(email)) {
      return res
        .status(400)
        .json({ error: "Use College Email ID only", success: false });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ error: "User Already Exists", success: false });
    }
    await User.create({
      email,
      password,
    });

    user = await User.findOne({ email });
    const token = createTokenForUser(user);

    return res.status(200).json({
      token: token,
      messsage: "Register Successful",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error: "Incorrect Email or Password",
      success: false,
    });
  }
});

module.exports = router;
