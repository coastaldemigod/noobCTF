const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = async () => {
  await mongoose.connect(MONGO_URI)
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};

// Reference
// https://www.mongodb.com/developer/article/mongoose-versus-nodejs-driver/

// Basically, mongoose is an ORM (object relational mapping) on top of mongodb native driver
// what this means is that with mongoose, we can define a set schema, with which we want to access data,
// making it somewhat like SQL
// On the other hand, using mongodb native driver gives us the freedom to actually access the document format of the data
// and use it as we wish.