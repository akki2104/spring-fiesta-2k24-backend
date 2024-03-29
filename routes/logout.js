const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.clearCookie("token", { httpOnly: true }).json({
    message: "Logout successful",
    success: true,
  });
});

module.exports = router;
