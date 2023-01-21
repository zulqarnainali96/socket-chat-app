const { createUser, userLogin } = require("../modules/login");
const route = require("express")();
const bcrypt = require("bcrypt");

route.post("/create-user", (request, response) => {
  const { email, password } = request.body;
  createUser(request.body)
    .then((resp) => {
      response.status(200).send({ message: "User Created"});
    })
    .catch((err) => {
      console.log(err);
      response.status(400).send({ message: "User not found", error: err });
    });
});

route.post("/login-user", (request, response) => {
  const { email, password } = request.body;
  userLogin()
    .then((resp) => {
      const user = resp.find((user) => user.email == email);
      bcrypt.compare(password, user.password, function (error, result) {
        response.send({result : result});
      });
    })
    .catch((err) => {
      response.status(404).send({message : "user not found", errorMsg: err });
    });
});

module.exports = route;
