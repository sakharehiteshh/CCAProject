const express = require('express')
const app = express()
var port = process.env.PORT || 8080;
app.use (express.urlencoded ({extended: false}))
const cors = require('cors')//New for microservice
app.use(cors())//New for microservice
app.listen(port ,() =>
    console.log(`Express server is running on port " :${port}`))
app.get('/', (req, res) => {
    res.send("Microservice1 gateway by Niharika Gadhave and Hitesh Sakhare Usage:host/microservice1?birthMonth=X");  
})
app.get("/microservice1", (req, res)=>{
    var birthMonth;
    var printmonth;
    var printsoulSymbol;
    var soulSymbol=["Dragon","Phoenix","Yin-Yang","Lion","Wolf","Fish","Fire","Horse","Flower","Star","Tree","Water"];
    var month=["January","February","March","April","May","June","July","August","September","October","November","December"];
    if (birthMonth==req.query.birthMonth){
      printmonth=month[birthMonth - 1];
      printsoulSymbol=soulSymbol[birthMonth - 1];
    }
    res.send(`Your Birth Month is ${printmonth} and your Soul Symbol is ${printsoulSymbol}.`);
});