const express = require('express')
const app = express()
var port = process.env.PORT || 8080;
app.use (express.urlencoded ({extended: false}))
const cors = require('cors')//New for microservice
app.use(cors())//New for microservice
app.listen(port)
    console.log("Express server is running on port " + port)
app.get('/', (req, res) => {
    res.send('Microservice Gateway by Niharika Gadhave and Hitesh Sakhare and there Birthday');

})
app.get("/microservice1", (req,res)=>{
    res.send("Niharika's Birthday: 29 May 1999 & Hitesh's Birthday: 05 April 1998  ="+req.query.data)
})