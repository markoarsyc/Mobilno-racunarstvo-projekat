const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = 8000;

//middleware
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://kaca_marko:zktzkwXMHagzWAht@imdbclone.hygdsdr.mongodb.net/?retryWrites=true&w=majority&appName=IMDBClone')
  .then(() => {
    console.log('Connected!');
    app.listen(port, ()=>{
      console.log("Server is running on port "+port);
    })
    
  })
  .catch((e)=> {
    console.log("Connection failed! "+e);
  })