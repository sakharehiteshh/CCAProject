const express= require('express');
const app=express();
const port = process.env.PORT || 8080; 
const server = require('http').createServer(app);
const io = require('socket.io')(server);
server.listen(port); //changed from app.listen(port)
app.use(express.static('static'));
app.use(express.urlencoded({extended: false}));
// const superagent = require('superagent')
console.log("WebChat server is running on port " + port);
const MongoClient = require('mongodb').MongoClient;
// const mongourl = "mongodb+srv://cca-gadhaven1:CCAlab2022@cca-gadhaven1.kmct8.mongodb.net/cca-labs?retryWrites=true&w=majority"; //the full URL with username/password
// const dbClient = new MongoClient (mongourl, {useNewUrlParser: true, useUnifiedTopology: true});
// dbClient.connect (err => {
//     if (err) throw err;
//     console.log ("Connected to the MongoDB cluster");
// });
app.get("/", (req,res)=>{
    res.sendFile(__dirname + '/static/assignment.html')
})

// app.get("/chatbot", (req,res)=>{
//     res.sendFile(__dirname + '/static/chatbot.html')
// })


function signup(account,callback){
    // superagent.post('https://cca-gadhaven1-accountsearch.herokuapp.com/signup')
    // .send(account)
    // .end((err, res) => {
        if (res.body.status==="Registered"){
        return callback(true,res.body.message,null);
        }else
        callback(false,res.body.message,null);
        }
    

function login(username,password, callback){
    // superagent.get(`https://cca-gadhaven1-accountsearch.herokuapp.com/login/${username}/${password}`)
    // .end((err, res) => {
        if (res.body.status==="found"){
        return callback(true,res.body.message,res.body.account);
        }else
        callback(false,res.body.message,null);
        }
    

function BroadcastAuthenticatedClients(event,message){
var sockets = io.sockets.sockets;
for (var id in sockets){
const socketclient = sockets[id];
if(socketclient && socketclient.authenticated){
socketclient.emit(event,message);
}
}}

io.on('connection', (socketclient) => { 
	console.log('A new client is connected!'); 
    var onlineClients = Object.keys(io.sockets.sockets).length;
    var welcomemessage = `${socketclient.id} is connected! Number of connected clients: ${onlineClients}`
    io.emit("online", welcomemessage);
    socketclient.on("message", (data) => {
        console.log('Data from a client: ' + data);
        BroadcastAuthenticatedClients("message", `${socketclient.id} says: ${data}`);
        });
        socketclient.on("typing", () => {
        console.log('Someone is typing...');
        BroadcastAuthenticatedClients("typing", `${socketclient.id} is typing ...`);
        });
        socketclient.on('disconnect', () => {
        var onlineClients = Object.keys(io.sockets.sockets).length;
        var byemessage = `${socketclient.id} is disconnected! Number connected clients: ${onlineClients}`;
        console.log(byemessage);
        BroadcastAuthenticatedClients("online", byemessage);
        });
       socketclient.on("login", (username,password) => {
            console.log(`Debug> Login data: ${username}/${password}`);
            login(username,password,(authenticated,message,account)=>{
            if (authenticated){
            socketclient.authenticated=true;
            socketclient.emit("authenticated", account.username);
            console.log(`Debug> ${username} is authenticated and logged in successfully`);
            }else{
            socketclient.emit("login-failed",message);
            console.log(`Debug> Login failed: ${username}/${password}`);
            }
            })
            });

        socketclient.on("register", (user) => {
            console.log(`Debug> Login data: ${user}`);
            signup(user,(authenticated,message,account)=>{
            if (authenticated){
            socketclient.authenticated=true;
            socketclient.emit("registration-successful", message);
            console.log(`Debug> ${user.username} is registered successfully`);
            }else{
            socketclient.emit("registration-failed",message);
            console.log(`Debug> registration failed: ${user.username}`);
            }
            })
            });
});