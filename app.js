const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const redis = require('redis');



const app = express();
const PORT = 3000;

//MongoClient
//const uri = "mongodb://localhost:27017";
const uri = "mongodb+srv://humphrey:<test>@cluster0.az4ap.mongodb.net/?retryWrites=true&w=majority";

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