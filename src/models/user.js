const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const userSchema = new Schema({
  // name: { type: String },
  username: { 
    type: String, 
    unique:[true,'username should be unique'] 
  },
  email: { 
    type: String,
    unique: [true,'email already registered, please login'],
    validate:{
      validator:function(v){
        return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(v);
      }
    }
    },
  password: { type: String },
},
{
versionKey:false
});

module.exports = mongoose.model("user", userSchema);