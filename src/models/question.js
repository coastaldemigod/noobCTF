const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const qabankSchema = new Schema({
  question_ID:{
    type:String,
    unique:[true,'question_ID must be unique']
  },
  contest_ID:{
    type:String
  },
  question_category:{
    type:String
  },
  question_name:{
    type:String
  },
  question:{
    type:String
  },
  answer:{
    type:String
  }
});

module.exports= mongoose.model("question",qabankSchema);