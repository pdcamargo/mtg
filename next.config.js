const path = require("path");

module.exports = {
  serverRuntimeConfig: {
    databasePath: path.join(__dirname, "mtg-database.json"),
  },
};
