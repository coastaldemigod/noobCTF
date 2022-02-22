const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const solvedSchema = new Schema({
  question_ID:{
    type:String,
  },
  contest_ID:{
    type:String
  },
  username:{
    type: String
  }
})

module.exports = mongoose.model("solution",solvedSchema);

// Can also add timestamp at which solution is submitted.