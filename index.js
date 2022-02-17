const express = require('express')
const app = express()
var port = process.env.PORT || 8080;
//app.use(express.static('static'))
app.use (express.urlencoded ({extended: false}))
const cors = require('cors')//New for Microservice
app.use(cors())//New for Microservice
app.listen(port, () => 
    console.log(`Express server is running on port :${port}`))
app.get('/', (req, res) => {
    res.send('Microservice 1 Gateway by Niharika Gadhave and Hitesh Sakhare. Usage: host/Age_ChineseZodiac?year=xxxx')  
})
app.get('/Age_ChineseZodiac', function (req, res) {
    
    var birth_year = req.query.year;
    var current_year = new Date().getFullYear();
    console.log(`Birth_year: ${birth_year}`);
    var age = current_year - birth_year;
    console.log(`Age: ${age}`);
    var mod = birth_year % 12;
    var arr = ["Monkey","Rooster","Dog","Pig","Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat"];  
    let animal = arr[mod];
    res.send(`You are ${age} years old and you are a ${animal}.`);

});

