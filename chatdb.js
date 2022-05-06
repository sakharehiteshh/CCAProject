const MongoClient = require('mongodb').MongoClient;
const mongourl = "mongodb+srv://cca-gadhaven1:CCAlab2022@cca-gadhaven1.kmct8.mongodb.net/cca-project-team16?retryWrites=true&w=majority";
const dbClient = new MongoClient(mongourl,
                {useNewUrlParser: true, useUnifiedTopology: true});

dbClient.connect(err => {
    if (err) throw err;
    console.log("Connected to the MongoDB cluster");
});

module.exports.storePrivateMessage = (receiver,  sender, message, timestamp, callback)=>{
    //TODO: validate the data and insert to the database collection
    console.log({receiver, sender, message, timestamp})
    const db = dbClient.db();
     db.collection("chatdb").insertOne({receiver, sender, message, timestamp}, (err,result)=>{
                if(err){
                   return callback(false)
                }
                    return  callback(true)
                });
    
    }
   
    module.exports.loadPrivateMessage = (sender, receiver, callback) => {
    
        
        const user1 = sender
        const user2 = receiver
        const cursor = dbClient.db().collection("chatdb").find({
            $or:[ {sender:user1, receiver:user2},
            {sender:user2, receiver:user1}]
            }).sort({timestamp:1}).limit(100)
            
            cursor.toArray((err,result)=>{
                        if(err){
                           return callback(false)
                        }
                            return  callback(result)
                    })
                }
   