const express = require("express");
const appUtils = require('./utils');
const db =require ("./models");



const jsonParser = express.json();

const app = express();

app.use(jsonParser);
app.use(express.urlencoded());

app.get("/health", (req, res) => {
  return res.status(200).json({ OK: 'da' })
});

app.post("/users", async (request, response) => {
    // appUtils.handleUserCreation()
  if (!request.body) return response.sendStatus(400);
  console.log("b", request.body);

  try {
    const userPayload = appUtils.handleUserCreation(request.body);
    // save user to database
    await db.user.create(userPayload);
    return response.send(userPayload);
  } catch (e) {
    console.log(e.massage);
    return response.status(400).json({ message: e.message });
  }
});

app.get("/users", async(request, response)=>{
    const allUsers = await db.user.findAll()
    return response.send(allUsers)
})

app.listen(3002, () => {
  console.log("Application listening on port 3002!");
});
