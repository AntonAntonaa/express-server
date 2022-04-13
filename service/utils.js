const moment = require("moment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

function validateUserData(body) {
  if (!body.userName || !body.email || !body.password) {
    throw new Error("Please pass correct user data");
  }
  const salt = bcrypt.genSaltSync(10);
  const passwordToSave = bcrypt.hashSync(body.password, salt);
  const dob = moment("13-04-2022", "DD-MM-YYYY");
  const user = {
    userName: body.userName,
    email: body.email,
    password: passwordToSave,
    dob: dob.toDate(),
  };
  return user;
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log('headers', req.headers);
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }
  jwt.verify(token, "tokenKey", (err, user) => {
    console.log('verify token error', err);
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
}

function validatePassword(password, hashToCompare) {
  return bcrypt.compareSync(password, hashToCompare);
}

module.exports = {
  validateUserData,
  authenticateToken,
  validatePassword,
};
