const express= require('express');
const app=express();
const chathistory = require('./chatdb')
const fetch = require('cross-fetch')
var port = process.env.PORT || 8080; 
const server = require('http').createServer(app);
const io = require('socket.io')(server);
server.listen(port);
app.use(express.static('static'));
app.use(express.json({extended: false}));
const superagent = require('superagent')
console.log("WebChat server is running on port " + port);
const MongoClient = require('mongodb').MongoClient;
const mongourl = "mongodb+srv://cca-gadhaven1:CCAlab2022@cca-gadhaven1.kmct8.mongodb.net/cca-project-team16?retryWrites=true&w=majority";
const dbClient = new MongoClient(mongourl,
                {useNewUrlParser: true, useUnifiedTopology: true});
dbClient.connect(err => {
    if (err) throw err;
    console.log("Connected to the MongoDB cluster");
});
// app.use(cors())
app.get("/", (req,res)=>{
    res.sendFile(__dirname + '/static/chatclient.html')
})

app.get("/chatbot", (req,res)=>{
    res.sendFile(__dirname + '/static/chatbot.html')
})




function signup(account,callback){
    superagent.post('https://cca-team16-mschatdatabase.herokuapp.com/signup/')
    .send(account)
    .end((err, res) => {
        if (res.body.status==="Registered"){
        return callback(true,res.body.message,null);
        }else
        callback(false,res.body.message,null);  
    }
)}  
    

function login(username,password, callback){
    superagent.get(`https://cca-team16-mschatdatabase.herokuapp.com/login/${username}/${password}`)
    .end((err, res) => {
        console.log(res.body,err)
        if (res.body.status==="authenticated"){
        return callback(true,null,res.body.profile);
        }else
        callback(false,res.body.message,null);
        }
    )}

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
        
        // socketclient.on('chathistory', (sender) => {
            
        //     let receiver = socketclient.username;     
        //     chatdb.loadPrivateMessage(sender, receiver, (result) => {
            
        //         //console.log("History in index.js: ", result);
        
        //         if(socketclient && socketclient.authenticated && socketclient.username == receiver){
        //             // list = ListAuthenticatedClients(socketclient)
        //             socketclient.emit("chathistory", result, sender);
        //         }
        //     });    
        // })
        // socketclient.on('privatechat', (receiver, message) => {

        //     console.log(`in index.js pvtmessage: `, receiver, message)        
    
        //     var sockets = io.sockets.sockets;
        //     let sender = socketclient.username;    
    
        //     for ( var id in sockets){
        //     const socketclient = sockets[id];            
            
        //     if(socketclient && socketclient.authenticated && socketclient.username == receiver){
        //         // list = ListAuthenticatedClients(socketclient)
        //         console.log("Sender in pvtmessage event in index.js :", sender);
        //         socketclient.emit('privatechat', sender, message);
        //         }
        //     }

        //     var timestamp = Date.now();
        //     let privatechatJSON = { sender: sender, receiver: receiver, message: message, timestamp: timestamp}
        //     chatdb.storePrivateMessage(privatechatJSON); 
        // });
        socketclient.on("typing", () => {
        console.log('Someone is typing...');
        BroadcastAuthenticatedClients("typing", `${socketclient.id} is typing ...`);
        });
        socketclient.on('disconnect', () => {
        var onlineClients = Object.keys(io.sockets.sockets).length;
        var byemessage = `${socketclient.id} is disconnected! Number connected clients: ${onlineClients}`;
        console.log(byemessage);
        // BroadcastAuthenticatedClients("online", byemessage);
        var sockets = io.sockets.sockets; 
            let onlineUsers = new Map(); 
            for (var id in sockets){ 
                const socketclient = sockets[id]; 
                if(socketclient && socketclient.authenticated && socketclient.profile){ 
                    onlineUsers.set(socketclient.username,socketclient.profile); } } 
                    let onlineUsersJSON = []; 
                    onlineUsers.forEach((value,key)=>{ 
                    onlineUsersJSON.push(value); });
                    chatbotprofile = { "username": "iChatBot", "fullname": "ChatBot",
                    "avatar": "https://i.pravatar.cc/150?u=iChatBot" }
            
                     onlineUsers.set("iChatBot", chatbotprofile)
                    for (var id in sockets){ 
                        const socketclient = sockets[id]; 
                        if(socketclient && socketclient.authenticated && socketclient.profile){ 
                            socketclient.emit("update", onlineUsersJSON); } }
        });

       socketclient.on("login", (username,password) => {
            console.log(`Debug> Login data: ${username}/${password}`);
            login(username,password,(authenticated,message,account)=>{
            if (authenticated){
            socketclient.authenticated=true;
            socketclient.username=account.username; 
            socketclient.profile=account
            socketclient.emit("authenticated", account);
            console.log(`Debug> ${username} is authenticated and logged in successfully`);
            var sockets = io.sockets.sockets; 
            let onlineUsers = new Map(); 
            for (var id in sockets){ 
                const socketclient = sockets[id]; 
                if(socketclient && socketclient.authenticated && socketclient.profile){ 
                    onlineUsers.set(socketclient.username,socketclient.profile); } } 
                    let onlineUsersJSON = []; 
                    onlineUsers.forEach((value,key)=>{ 
                        onlineUsersJSON.push(value); }); 
                        console.log(onlineUsersJSON) 
                        chatbotprofile = { username: "iChatBot", fullname: "ChatBot" };

                        onlineUsers.set(chatbotprofile.username, chatbotprofile);
                        for (var id in sockets){ 
                            const socketclient = sockets[id]; 
                            if(socketclient && socketclient.authenticated && socketclient.profile){ 
                                socketclient.emit("userlist", onlineUsersJSON); 
                            } 
                        }

                }else{
                    socketclient.emit("login-failed",message);
                    console.log(`Debug> Login failed: ${username}/${password}`);
                    }
                })
            });

        socketclient.on("privatechat" , 
        (receiver,message, sender) => {
            var timestamp = Date.now()
                chathistory.storePrivateMessage(receiver,  sender, message, timestamp, (response)=>{
                    if(response){
                        var sockets = io.sockets.sockets;
       
        
        for (var id in sockets){ 
        let socketclient = sockets[id]; 
        if(socketclient && socketclient.authenticated && 
            socketclient.username==receiver){ 
            socketclient.emit("privatechat" ,
            sender,message); 
            }
        }
                    }else{
                        console.log("chat not stored")
                    }
                })
                })

                socketclient.on("chathistory", (sender) => {
                    let receiver = socketclient.username;     

                    chathistory.loadPrivateMessage(sender, receiver, (result) => {
                    
                        //console.log("History in index.js: ", result);
                
                        if(socketclient && socketclient.authenticated && socketclient.username == receiver){
                            // list = BradcasteAuthenticatedClients(socketclient)
                            socketclient.emit("chathistory", result, sender);
                        }
                    }); 
        //         chathistory.loadPrivateMessage(receiver,  sender, (response)=>{
        //             if(response){
        //                 var sockets = io.sockets.sockets;
        //         for (var id in sockets){
        //         let socketclient = sockets[id];
        //         if(socketclient && socketclient.authenticated &&
        //         socketclient.username==sender){
        //         socketclient.emit("chathistory",response);
        //         }
        // }
        //             }else{
        //                 console.log("chat not loaded")
        //             }
        //         })
                })
                async function query(data) {

                    const response = await fetch(
                        "https://api-inference.huggingface.co/models/microsoft/DialoGPT-large",
                        {
                            headers: { Authorization: "Bearer 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" },
                            method: "POST",
                            body: JSON.stringify(data),
                        }
                    );
                    const result = await response.json();
                    return result;
                }
                socketclient.on("chatbot_req", (message) => {

                    const db = dbClient.db("cca-labs-team15")
        
                    var messageJson = {
                        "sender": socketclient.username,
                        "receiver": "iChatBot",
                        "message": message,
                        "timestamp": Date.now()
                    }
                    console.log(`messageJson - `,messageJson)
        
                    chatdb.storePrivateMessage(messageJson);
        
                    query({"inputs": {
                        "text": message
                    }}).then((response) => {
                        console.log(JSON.stringify(response));
                        console.log("reply - ", response["generated_text"])
            
                        var replyJson = {
                            "sender": "iChatBot",
                            "receiver": socketclient.username,
                            "message": response["generated_text"],
                            "timestamp": Date.now()
                        }
                        console.log("replyJson: ", replyJson);
        
                        chatdb.storePrivateMessage(replyJson);
                        var chatbotmessage = response["generated_text"];
                        var list = ListAuthenticatedClients(socketclient);
        
                        socketclient.emit("chatbot_response",chatbotmessage,list);
                });
                
            })
   
        
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