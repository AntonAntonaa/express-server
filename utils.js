const moment = require ("moment")

function handleUserCreation(body) {
  if (!body.userName || !body.email || !body.password || !body.dob) {
    throw new Error("Please pass correct user data");
  }
  const dob=moment(body.dob, "DD-MM-YYYY")
  const user = {
    userName: body.userName,
    email: body.email,
    password: body.password,
    dob: dob.toDate()
  };
  return user;
}
module.exports = {
  handleUserCreation: handleUserCreation,
};
