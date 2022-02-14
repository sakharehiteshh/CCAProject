const express = require('express')
const app = express()
var port = process.env.PORT || 8080;
app.use (express.urlencoded ({extended: false}))
const cors = require('cors')//New for microservice
app.use(cors())//New for microservice
app.listen(port)
    console.log("Express server is running on port " + port)
app.get('/', (req, res) => {
    res.send('Microservice Gateway by Niharika Gadhave and Hitesh Sakhare. Usage: host/date_birthday?date=29 May & 05 April');

})
app.get("/microservice1", (req,res)=>{
    res.send(" microservice 1 result = "+req.query.data)
})