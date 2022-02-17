const express = require('express')
const app = express()
var port = process.env.PORT || 8080 
//app.use(express.static('static'))
app.use (express.urlencoded ({extended: false}))
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
    var c = app.get("year");
    var birthyear = parseInt(c);
    var age= currentYear-birthyear;
    var zodiac_option=birthyear%12;
    var zodiac_answer = zodiac[zodiac_option];
    
    app.get('/', (req, res) => {
        res.send("Your age is "+age+" and chinese zodiac sign is "+zodiac_answer);  
    })
    res.send(result)
});
