const router = require("../router");
const db = require("../models");
const appUtils = require("../service/utils");

const getAll = async (request, response) => {
  if (!request.body) return response.sendStatus(400);
  try {
    const allUsers = await db.user.findAll();
    return response.send(allUsers);
  } catch (e) {
    console.log(e.massage);
    return response.status(400).json({ message: e.message });
  }
};

const postUser = async (request, response) => {
  if (!request.body) return response.sendStatus(400);

  try {
    const userPayload = appUtils.validateUserData(request.body);
    await db.user.create(userPayload);
    return response.send(userPayload);
  } catch (e) {
    console.log(e.massage);
    return response.status(400).json({ message: e.message });
  }
};

const getOne = async (request, response) => {
  const userid = request.params.id;
  try {
    const user = await appUtils.getUserById(userid);
    return response.send(user);
  } catch (e) {
    return response.status(404).json({ message: e.message });
  }
};

const putUser = async (request, response) => {
  const userid = request.params.id;
  try {
    await appUtils.getUserById(userid);
  } catch (e) {
    return response.status(404).json({ message: e.message });
  }
  try {
    const userPayload = appUtils.validateUserData(request.body);
    const user = await appUtils.updateUser(userid, userPayload);
    return response.send(user);
  } catch (e) {
    return response.status(400).json({ message: e.message });
  }
};

const deleteUser = async (request, response) => {
  const userid = request.params.id;
  try {
    await appUtils.getUserById(userid);
  } catch (e) {
    return response.status(404).json({ message: e.message });
  }
  try {
    await appUtils.deleteUser(userid);
    return response.sendStatus(200);
  } catch (e) {
    return response.status(500).json({ message: e.message });
  }
};

const postLogin = async (req, res) => {
  try {
    const dbUser = db.users.findOne({ where: req.body.userName });
    if (
      !dbUser ||
      !appUtils.validatePassword(req.body.password, dbUser.password)
    ) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    delete user.password;
    return res.json({ token: jwt.sign(user, tokenKey) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAll,
  postUser,
  getOne,
  putUser,
  deleteUser,
  postLogin
};