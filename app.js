const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const redis = require('redis');

const app = express();
const PORT = 3000;

//MongoClient
const uri = "mongodb://localhost";
const client = new MongoClient(uri,{useNewUrlParser: true,useUnifiedTopology: true});

//Redis client
const redisClient = redis.createClient();

app.use(express.json());