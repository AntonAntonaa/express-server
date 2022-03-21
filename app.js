const express = require("express");
const appUtils = require("./utils");
const db = require("./models");
const { request } = require("express");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const token = jwt.sign({ foo: "bar" }, "shhhhh");
const bcrypt = require(" bcryptjs ");

const jsonParser = express.json();
const app = express();
const salt = bcrypt.genSaltSync(10)
const passwordToSave = bcrypt.hashSync(password, salt)

app.use(jsonParser);
app.use(express.urlencoded());

app.get("/health", appUtils.authenticateToken, (req, res) => {
  return res.status(200).json({ OK: "da" });
});

app.post("/users", async (request, response) => {
  if (!request.body) return response.sendStatus(400);

  try {
    const userPayload = appUtils.validateUserData(request.body);
    await db.user.create(userPayload);
    return response.send(userPayload);
  } catch (e) {
    console.log(e.massage);
    return response.status(400).json({ message: e.message });
  }
});

app.get("/users", async (request, response) => {
  const allUsers = await db.user.findAll();
  return response.send(allUsers);
});

app.get("/users/:id", appUtils.authenticateToken, async (request, response) => {
  const userid = request.params.id;
  try {
    const user = await appUtils.getUserById(userid);
    return response.send(user);
  } catch (e) {
    return response.status(404).json({ message: e.message });
  }
});

app.put("/users/:id", async (request, response) => {
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
});

app.delete("/users/:id", async (request, response) => {
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
});

app.post("/auth/login", async (req, res) => {
  try {
    const dbUser = db.users.findOne({ where: req.body.userName });
    if (!dbUser || dbUser.password !== req.body.password) {
      throw new Error("WRONG");
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res.status(500).json({ message: error.massage });
  }
});

app.listen(3002, () => {
  console.log("Application listening on port 3002!");
});
