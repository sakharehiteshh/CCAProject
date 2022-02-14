const express = require('express')
const app = express()
var port = process.env.PORT || 8080;
app.use (express.urlencoded ({extended: false}))
const cors = require('cors')//New for microservice
app.use(cors())//New for microservice
app.listen(port)
    console.log("Express server is running on port " + port)
app.get('/', (req, res) => {
    res.send('Microservice Gateway by Niharika Gadhave and Hitesh Sakhare. Usage: host/Age_ChineseZodiac?year=xxxx');

})
app.listen(port)
    console.log("Express server is running on port " + port)
app.get("/Usage: host/Age_ChineseZodiac?year=2000", (req,res)=>{
    res.send(" You are 21 year olds and you are a Dragon ="+req.query.data)
})