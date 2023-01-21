const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "myuser",
  database: "mytest",
  port: 3306,
  password: "",
});

module.exports =  connection ;
