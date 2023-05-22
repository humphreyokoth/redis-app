const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const redis = require('redis');
require('dotenv').config();
const postRoutes = require('./routes/postRoutes');
const { default: mongoose } = require('mongoose');





const app = express();
const PORT = 3000;

//MongoClient
const uri = process.env.DATABASE_URL;
//const uri = "";
//const uri = process.env.DATABASE_URL

// const client = new MongoClient(uri,{useNewUrlParser: true,useUnifiedTopology: true});
//  let db;
//  client.connect( err => {
//     if(err) throw err;
//     console.log("Connected to Mongodb");
//     db = client.db('blog');
//  })
try {
    mongoose.connect(uri);   
    console.log("Connected to mongodb")
} catch (error) {
    console.log("Error connecting to mongodb");
    console.log(error);
}

//Redis client
const redisClient = redis.createClient();

app.use(express.json());
// Routes
app.use('/postRoutes',postRoutes);
//app.use('/api',routes);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});