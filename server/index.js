//new version of node
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

//const express = require('express');

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";



const app = express();
dotenv.config();
app.get('/', (req, res) => {
  res.send('Hello to pcdemoapp');
});

app.use(bodyParser.json({ limit: "30mb", extended: true  }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true  }));
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // to enable calls from every domain 
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE'); // allowed actiosn
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
  
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200); // to deal with chrome sending an extra options request
    }
  
    next(); // call next middlewer in line
  });
app.use('/posts', postRoutes);
app.use("/user", userRouter);

//const CONNECTION_URL = 'mongodb+srv://pcdemouser:pcdemouser123@cluster0.suy2y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

    if (process.env.NODE_ENV === 'production') {
      const path = require('path');
      console.log(path.join(__dirname, '../client', 'build', 'index.html'));
      app.use(express.static(__dirname));
      app.use(express.static(path.join(__dirname, '../client', 'build')));
      app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
        console.log(path.join(__dirname, '../client', 'build', 'index.html'));
      });
    }

//mongoose.set('useFindAndModify', false);
