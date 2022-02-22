const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const contestSchema = new Schema({
  contest_ID:{
    unique:[true,'contest_id must be unique'],
    type:String,
  },
  contest_name:{
    type:String
  },
  creater_email:{
    type: String,
    validate:{
      validator:function(v){
        return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(v);
      }
    }
  },
  start_time:{
    type:Date
  },
  end_time:{
    type:Date
  }
});

module.exports = mongoose.model("contest",contestSchema);

// Reference

// Date methods are not hooked into mongoose
// thus setting them would be a bit tedious.
// https://mongoosejs.com/docs/schematypes.html#dates
// https://github.com/Automattic/mongoose/issues/1598