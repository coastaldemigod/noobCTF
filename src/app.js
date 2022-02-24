require("./databaseSetup.js").connect();
const express = require("express");
const app = express();

var cookieParser = require('cookie-parser')

const login = require("./routes/login");
const register = require("./routes/register")
const { authentication, authorization } = require("./middleware/auth");

const apirouter = express.Router();
const contests=require('./routes/api/contests')
const contest=require('./routes/api/contest')
const questions=require('./routes/api/questions')
const question=require('./routes/api/question')
const submit = require('./routes/api/submit')

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'))

// In use when frontend and backend were hosted on different domains.
// app.use(function(req, res, next) {
//   console.log("backend called")
//   console.log(req.path)
//   res.header("Access-Control-Allow-Origin", "http://localhost:5500"); 
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.get("/basic", (req, res, next) => {
  res.status(200).json("the api is working");
})

apirouter
.get('/contests',contests)
.get('/contest/:cid',contest)
.get('/contest/:cid/questions',questions)
.get('/contest/:cid/question/:qid',question)
.post('/submit',authorization,submit)

app.use('/api',apirouter);

app.post("/register", register);

app.post("/login", authentication, login);

module.exports = app;

// Reference
// https://stackoverflow.com/questions/28305120/differences-between-express-router-and-app-get

// Reference
// res.json() evenually calls res.send()
// but before that it adds header content-type:application/json 
// and also formats non json objects like null and undefined
// https://stackoverflow.com/questions/19041837/difference-between-res-send-and-res-json-in-express-js

// Reference 
// Handling JWT on client using cookies
// https://mannharleen.github.io/2020-03-19-handling-jwt-securely-part-1/


/*
POST
/login
body{
  email
  password
}
[also auth via cookie]

/register
body{
  username
  email
  password
}

/api

GET
/contests
/contest/:id
/contest/:id/questions
/contest/:id/question/:id

POST
/submit
body{
  contest:id,
  question:id,
  answer:string
}
[ auth via cookie ]

*/