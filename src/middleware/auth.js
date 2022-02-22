const jwt = require("jsonwebtoken");
const User = require("../models/user");

const token_key = process.env.TOKEN_KEY;

async function authorization(req, res, next) {

  // the token can be send in header or body
  const token = req.cookies['access_token'] || req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json("A token is required for authorization");
  }
  try {
    const decoded = jwt.verify(token, token_key);
    // console.log(decoded);
    const user_id = decoded.user_id;
    const user = await User.findById(user_id);
    // console.log(user);
    req.user = user
  } catch (err) {
    console.log(err);
    return res.status(401).json("Invalid Token for authorization");
  }
  return next();
}

async function authentication(req,res,next){
  const token = req.cookies['access_token'] || req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return next();  
  }
  try {
    const decoded = jwt.verify(token, token_key);
    const user_id = decoded.user_id;
    const user = await User.findById(user_id);
    req.user = user
  } catch (err) {
    console.log(err);
    return next();
  }
  return next();
}

module.exports = {authentication,authorization};