const User = require("../models/user");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

async function login(req,res,next){
    try {
        const { email, password } = req.body;
    
        if (!(email && password)) {
          if (req.user)
            return res.status(200).json({'username':req.user.username,'email':req.user.email});
          return res.status(400).json("Please enter email and password");
        }
    
        let user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
    
          const token = jwt.sign(
            { user_id: user._id },
            process.env.TOKEN_KEY
          );
          user={
              'username':user.username,
              'email':user.email
            }
          return res.status(200).cookie('access_token', token).json(user);
        }
        else
          return res.status(400).json("Invalid Credentials");
      }
      catch (err) {
        console.log(err);
        return res.status(500).json({ 'message': 'server on fire' });
      }
}

module.exports = login;