const express = require('express')
const app = express()
var option=5;
var printmonth;
var printsoulSymbol;
const soulSymbol=["Dragon","Phoenix","Yin-Yang","Lion","Wolf","Fish","Fire","Horse","Flower","Star","Tree","Water"];
const month=["January","February","March","April","May","June","July","August","September","October","November","December"];
const todaysDate = new Date();
const currentYear = todaysDate.getFullYear();
var birthMonth= month-1;
var url_string = "https://8080-52491bb9-3324-4286-8aa3-7600199969fe.cs-us-east1-pkhd.cloudshell.dev/?authuser=2&birthyear=1991" //window.location.href

if (option==req.query.option){
    printmonth=month[option];
    printsoulSymbol=soulSymbol[option];
}
var port = process.env.PORT || 8080;
app.use (express.urlencoded ({extended: true}))
const cors = require('cors')//New for microservice
app.use(cors())//New for microservice
app.listen(port)
    console.log("Express server is running on port " + port)
app.get('/', (req, res) => {
    res.send("Your birthmonth is "+printmonth+" and soul symbol is "+printsoulSymbol);  
})
app.get("/microservice1", (req, res)=>{
    res.send("microservice 1 result ="+req.query.data)
})