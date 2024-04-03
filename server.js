const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { connect } = require("./db/connect");
const cookiePaser = require("cookie-parser");

app.use(cors());
// routes
const login = require("./routes/login");
const register = require("./routes/register");
const logout = require("./routes/logout");
const candidate = require("./routes/candidate");

connect();

app.use("/register", register);
app.use("/login", login);
app.use("/logout", logout);
app.use("/candidate", candidate);

app.use(cookiePaser());

app.listen(port, () => {
  console.log(`The Website started successfully on port ${port}`);
});
