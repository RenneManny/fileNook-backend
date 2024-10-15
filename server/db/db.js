require("dotenv").config();
const mongoose = require("mongoose");
const db = process.env.MONGODBURL;

if (!db) {
  console.log(`Error connecting the database!!`);
  process.exit(1);
}
const databaseConnection = mongoose
  .connect(`${db}`, { serverSelectionTimeoutMS: 15000 })
  .then(() => console.log("Successfully created connection with database!"))
  .catch((err) => {
    console.log(`Error occured ,${err}`);
  });

module.exports = databaseConnection;
