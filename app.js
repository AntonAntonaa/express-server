const express = require("express");
const appUtils = require("./utils");
const db = require("./models");
const { request } = require("express");
const { response } = require("express");

const jsonParser = express.json();
const app = express();

app.use(jsonParser);
app.use(express.urlencoded());

app.get("/health", (req, res) => {
  return res.status(200).json({ OK: "da" });
});

app.post("/users", async (request, response) => {
  if (!request.body) return response.sendStatus(400);

  try {
    const userPayload = appUtils.validateNewUserData(request.body);
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

app.get("/edit/:id", function(request, response){
  const userid = request.params.id;
  user.findAll({where:{id: userid}, raw: true })
  .then(data=>{
    response.render("edit.hbs", {
      user: data[0]
    });
  })
  .catch(err=>console.log(err));
});

app.put("/users/:id", (request, response) => {
  if (!request.body) return response.sendStatus(400);
  try {
    const userUpdate = appUtils.handleUserUpdate();
    return response.send(userUpdate);
  } catch (e) {
    console.log(e.massage);
    return response.status(404).json({ message: e.message });
  }
});

app.delete("/users/:id", (request, response) => {
  try{
    const userDelete = appUtils.userDelete()
    return response.send
  }

});




app.listen(3002, () => {
  console.log("Application listening on port 3002!");
});
/**
GET /users 1
GET /users/:id 1
POST /users 1 
PUT /users/:id
DELETE /users/:id
 */
