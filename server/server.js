const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = 8000;

//middleware
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://kacii:rfDXMnkAOeOoZk2W@backend.c88zu.mongodb.net/?retryWrites=true&w=majority&appName=backend')
  .then(() => {
    console.log('Connected!');
    app.listen(port, ()=>{
      console.log("Server is running on port "+port);
    })
    
  })
  .catch((e)=> {
    console.log("Connection failed! "+e);
  })