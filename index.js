const express = require('express')
const app = express()
const zodiac=["Monkey","Rooster","Dog","Pig","Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat"];
const todaysDate = new Date();
const currentYear = todaysDate.getFullYear(); 
var url_string = "https://8080-52491bb9-3324-4286-8aa3-7600199969fe.cs-us-east1-pkhd.cloudshell.dev/?authuser=2&birthyear=1999" //window.location.href
var url = new URL(url_string);
var c = url.searchParams.get("birthyear");
var birthyear = parseInt(c);
var age= currentYear-birthyear;
var zodiac_option=birthyear%12;
var zodiac_answer = zodiac[zodiac_option];
var port = process.env.PORT || 8080;
app.use (express.urlencoded ({extended: true}))
const cors = require('cors')//New for microservice
app.use(cors())//New for microservice
app.listen(port)
    console.log("Express server is running on port " + port)
app.get('/', (req, res) => {
    res.send("Your age is "+age+" and chinese zodiac sign is "+zodiac_answer);  
})
app.get("/microservice1", (req, res)=>{
    res.send("microservice 1 result ="+req.query.data)
})