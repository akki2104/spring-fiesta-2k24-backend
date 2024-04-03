const JWT = require("jsonwebtoken");

const secret = process.env.SECERT_JWT_TOKEN;

function createTokenForUser(user) {
  const payload = {
    id: user._id,
    email: user.email,
  };
  const token = JWT.sign(payload, secret, {
    expiresIn: "6h",
  });
  return token;
}

module.exports = createTokenForUser;
