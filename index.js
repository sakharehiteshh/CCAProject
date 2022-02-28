const express = require('express')
const app = express()
var port = process.env.PORT || 8080;
app.use (express.urlencoded ({extended: false}))
const cors = require('cors')//New for microservice
app.use(cors())//New for microservice
app.listen(port ,() =>
    console.log(`Express server is running on port " :${port}`))
app.get('/', (req, res) => {
    res.send("Microservice1 gateway by Niharika Gadhave and Hitesh Sakhare");  
})
app.get("/microservice1", (req, res)=>{
    var birthMonth;
    var printmonth;
    var printsoulSymbol;
<<<<<<< HEAD
    var soulSymbol=["Dragon","Phoenix","Yin-Yang","Lion","Wolf","Fish","Fire","Horse","Flower","Star","Tree","Water"];
    var month=["January","February","March","April","May","June","July","August","September","October","November","December"];

    printmonth=month[birthMonth - 1];
    printsoulSymbol=soulSymbol[birthMonth - 1];
    
=======
    const soulSymbol=["Dragon","Phoenix","Yin-Yang","Lion","Wolf","Fish","Fire","Horse","Flower","Star","Tree","Water"];
    const month=["January","February","March","April","May","June","July","August","September","October","November","December"];
    if (birthMonth==req.query.birthMonth){
      printmonth=month[birthMonth - 1];
      printsoulSymbol=soulSymbol[birthMonth - 1];
    }
>>>>>>> 9c2521528a8e28c5d94720104159fcad744a3c7d
    res.send(`Your Birth Month is ${printmonth} and your Soul Symbol is ${printsoulSymbol}.`);
});