"use strict";

const Fs = require("fs");
const Path = require("path");
const Sequelize = require("sequelize");
const basename = Path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../config/sequelize")[env];
const db = {};
const sequelize = new Sequelize("", "", "", config);

Fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = sequelize["import"](Path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
