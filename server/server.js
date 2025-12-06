const userRoutes = require("./routes/user.route");
const reviewRoutes = require("./routes/review.route");
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());


// Rute
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);


mongoose.connect('mongodb+srv://katarina_nikolic:movieAppAdmin@movieappdata.qmjba3q.mongodb.net/?appName=MovieAppData')
  .then(() => {
    console.log('Connected!');
    app.listen(port, ()=>{
      console.log("Server is running on port "+port);
    })
    
  })
  .catch((e)=> {
    console.log("Connection failed! "+e);
  })


