const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const redis = require('redis');
require('dotenv').config();
const routes = require('./routes/routes');





const app = express();
const PORT = 3000;

//MongoClient
//const uri = "mongodb://localhost:27017";
//const uri = "";
const uri = process.env.DATABASE_URL

const client = new MongoClient(uri,{useNewUrlParser: true,useUnifiedTopology: true});
 let db;
 client.connect(err =>{
    if(err) throw err;
    console.log("Connected to Mongodb");
    db = client.db('blog');
 })
//Redis client
const redisClient = redis.createClient();

app.use(express.json());
app.use('/api/',routes);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});