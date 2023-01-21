const connection = require("../mysqlDB/mysql");
const Promise = require("promise");
const bcrypt = require("bcrypt");
const saltRounds = 12;

const createUser = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      connection.query(
        "INSERT INTO chat_app (email,password) VALUES (?, ?)",
        [email, hash],
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );
    });
  });
};

const userLogin = () => {
  return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM chat_app`, (err, result) => {
        if(err) reject(err)
          resolve(result)
      })
  });
};

module.exports = { userLogin, createUser};
