const moment = require("moment");
const db = require("./models");

function validateUserData(body) {
  if (!body.userName || !body.email || !body.password || !body.dob) {
    throw new Error("Please pass correct user data");
  }
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
  return getUserById(id)
}

async function deleteUser (id) {
  await db.user.destroy({ where: { id } });
}


module.exports = {
  validateUserData,
  updateUser,
  getUserById,
  deleteUser
};
