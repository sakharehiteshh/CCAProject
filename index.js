const express = require('express')
const app = express()
const zodiac=["Monkey","Rooster","Dog","Pig","Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat"];
const todaysDate = new Date();
const currentYear = todaysDate.getFullYear(); 
function getParameter(birthyear){
    let parameters = new URLSearchParams(<script>window.location.search</script>);
    parameters.get(birthyear);
}
var c = getParameter("birthyear");
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