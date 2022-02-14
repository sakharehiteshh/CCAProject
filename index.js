const express = require('express')
const app = express()
var port = process.env.PORT || 8080;
app.use (express.urlencoded ({extended: false}))
const cors = require('cors')//New for microservice
app.use(cors())//New for microservice
app.listen(port)
    console.log("Express server is running on port " + port)
app.get('/', (req, res) => {
    res.send('Microservice Gateway by Niharika Gadhave and Hitesh Sakhare');

})
app.get("/microservice1", (req,res)=>{
    res.send("When is there birthday? ="+req.query.data)
})