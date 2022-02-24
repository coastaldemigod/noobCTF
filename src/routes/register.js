const User = require("../models/user");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

async function register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      // console.log(req.body);
      if (!(email && password && username)) {
        return res.status(400).json("Please enter all details");
      }
  
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).json("User Already Exist. Please Login");
      }
  
      const encryptedPassword = await bcrypt.hash(password, 10);
      let user = await User.create({
        // name,
        username,
        // email: email.toLowerCase(), // sanitize: convert email to lowercase
        email,
        password: encryptedPassword
      });
  
      const token = jwt.sign(
        { user_id: user._id },
        process.env.TOKEN_KEY
      );
      user={
        'username':user.username,
        'email':user.email
      }
      return res.status(201).cookie('access_token', token,{httpOnly: true}).json(user);
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ 'message': 'server on fire' });
    }
  }

  module.exports=register;