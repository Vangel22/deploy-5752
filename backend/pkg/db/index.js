const mongoose = require("mongoose");
// const config = require("../config");
const { getSection } = require("../config");

const init = () => {
  const url = getSection("db").url;
  // ${username}: Your MongoDB username
  // ${password}: Your MongoDB password
  // ${url}: The URL of your MongoDB cluster or server (excluding the port number)
  // ${dbname}: The name of the MongoDB database you want to connect to
  const username = getSection("db").username;
  const password = getSection("db").password;
  const dbname = getSection("db").dbname;
  const dsn = `mongodb+srv://${username}:${password}@cluster0.12jzasd.mongodb.net/${dbname}?retryWrites=true&w=majority`;

  mongoose.connect(dsn);
  console.log("Connected!");
};

module.exports = {
  init,
};
