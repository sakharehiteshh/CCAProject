const express = require('express')
const app = express()
var port = process.env.PORT || 8080 
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
    var result
    const zodiac=["Monkey","Rooster","Dog","Pig","Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat"];
    const todaysDate = new Date();
    const currentYear = todaysDate.getFullYear();
    var url_string = "https://8080-52491bb9-3324-4286-8aa3-7600199969fe.cs-us-east1-pkhd.cloudshell.dev/Age_ChineseZodiac?year="
    var url = new URL(url_string);    
    var c = url.searchParams.get("year");
    var year = parseInt(c);
    var age= currentYear-year;
    var zodiac_option=year%12;
    var zodiac_answer = zodiac[zodiac_option];
    app.get('/', (req, res) => {
        res.send("Your age is "+age+" and chinese zodiac sign is "+zodiac_answer);  
    })
    res.send(result)
});
