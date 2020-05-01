const fetch = require("node-fetch");

module.exports = async (request, response, next) => {
  response.send("joe");
};
