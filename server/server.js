require('dotenv').config();                     
const express = require('express');
const mongoose = require('mongoose');
           
const Port = process.env.PORT || 4000;   
const MongoURL = process.env.MONGO_URL;       
const app = express();

app.use(express.json());   

app.use((req,res,next)=>{
    console.log(req.method,req.path);
    next();
})


mongoose.connect(MongoURL)
.then(()=>{
        app.listen(Port, () => {
        console.log('Server is running on port ' + Port +'connected to DB');
});
})
.catch((err)=>console.log(err));


