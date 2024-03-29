const jwt = require("jsonwebtoken");

function getDataFromToken(req) {
  try {
    // console.log(req.cookies["token"]);
    // const token = req.cookies.get("token")?.value || "";
    // const token = req.cookies["token"]
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDcxN2QzMDJiZmJlMjdkNjc2Y2EzZiIsImVtYWlsIjoic3NnZGZiYyIsImlhdCI6MTcxMTc0MDg5MiwiZXhwIjoxNzExNzYyNDkyfQ.1XNYQAwmpv8ECjY0PUUcHksYXkkcXvqbDVhVR2WEsPQ"
      console.log(token);
    const decodeToken = jwt.verify(token, process.env.SECERT_JWT_TOKEN);
    return decodeToken.id;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getDataFromToken };
