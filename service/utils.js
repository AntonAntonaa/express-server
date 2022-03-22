const moment = require("moment");
const bcrypt = require("bcryptjs");

function validateUserData(body) {
  if (!body.userName || !body.email || !body.password || !body.dob) {
    throw new Error("Please pass correct user data");
  }
  const salt = bcrypt.genSaltSync(10);
  const passwordToSave = bcrypt.hashSync(body.password, salt);
  const dob = moment(body.dob, "DD-MM-YYYY");
  const user = {
    userName: body.userName,
    email: body.email,
    password: passwordToSave,
    dob: dob.toDate(),
  };
  return user;
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
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
