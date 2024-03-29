const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const { connect } = require("./db/connect");
const cookiePaser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

// routes
const login = require("./routes/login");
const register = require("./routes/register");
const logout = require("./routes/logout");

connect();

app.use("/register", register);
app.use("/login", login);
app.use("/logout", logout);

app.use(cookiePaser());
app.use(checkForAuthenticationCookie("token"));

app.listen(port, () => {
  console.log(`The Website started successfully on port ${port}`);
});
