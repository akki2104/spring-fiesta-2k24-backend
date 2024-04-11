const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { connect } = require("./db/connect");
const cookiePaser = require("cookie-parser");

const corsOptions = {
  origin: "https://springfiestaiiitsurat.in/",
  credentials: true,
  method: ["GET", "POST"],
};

app.options("*",cors(corsOptions));
app.use(cors(corsOptions));
// routes
const login = require("./routes/login");
const register = require("./routes/register");
const candidate = require("./routes/candidate");

connect();

//testing live connecting connection
app.get("/", (req, res) => {
  res.send("Wohoo, backend is live now!!!");
});

app.use("/register", register);
app.use("/login", login);
app.use("/candidate", candidate);

app.use(cookiePaser());

app.listen(port, () => {
  console.log(`The Website started successfully on port ${port}`);
});
