const db = require("../models");

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

module.exports = {
  getUserById,
  updateUser,
  deleteUser,
};
