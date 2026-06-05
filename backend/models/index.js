const sequelize          = require("../config/database");
const { Contact }        = require("./Contact");

// Add future models here and they will all be exported

module.exports = {
  sequelize,
  Contact,
};
