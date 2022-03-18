const moment = require("moment");

function validateNewUserData(body) {
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

function handleUserUpdate(id) {
  const userid = request.params.id;
  
  const userName = request.body.userName;
  const email = request.body.email;
  const password = request.body.password;
  const dob = request.body.dob;

  
  const user = db.users.find((u) => u.id == id);
  if (user) {
    user.name = userName;
    user.age = dob;
    user.password = password;
    user.email = email;
    response.send(user);
  } 
// app.post("/delete/:id", function(req, res){  
//   const userid = req.params.id;
//   User.destroy({where: {id: userid} }).then(() => {
//     res.redirect("/");
//   }).catch(err=>console.log(err));
module.exports = {
  validateNewUserData,
  handleUserUpdate
};