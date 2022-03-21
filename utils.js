const moment = require("moment");
const db = require("./models");

function validateUserData(body) {
  if (!body.userName || !body.email || !body.password || !body.dob) {
    throw new Error("Please pass correct user data");
  }
  const salt = bcrypt.genSaltSync(10);
  const passwordUser = password;
  const passwordToSave = bcrypt.hashSync(passwordUser, salt);
  const dob = moment(body.dob, "DD-MM-YYYY");
  const user = {
    userName: body.userName,
    email: body.email,
    password: body.password,
    dob: dob.toDate(),
  };
  return user;
}

async function getUserById(userid) {
  const user = await db.user.findByPk(userid);
  if (!user) {
    throw new Error("USER NOT FOUND");
  }
  return user;
}

async function updateUser(id, body) {
  const userName = body.userName;
  const email = body.email;
  const password = body.password;
  const dob = body.dob;

  await db.user.update({ userName, email, password, dob }, { where: { id } });
  return getUserById(id);
}

async function deleteUser(id) {
  await db.user.destroy({ where: { id } });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
function passwordCheck (err, rows) {
  if (err) {
      return done(err);
  }
  if (bcrypt.hashSync(passwordEnteredByUser, salt) === rows[0].password) {
    
  }

module.exports = {
  validateUserData,
  updateUser,
  getUserById,
  deleteUser,
  authenticateToken,
  passwordCheck
};
