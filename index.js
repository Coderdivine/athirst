
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");
//process.env.AUTH_URI ||
mongoose.connect('mongodb://localhost:27017/users');
const port = process.env.PORT || 5099;
const db = mongoose.connection
db.on("error",(err)=>{console.log(err)})
db.once("open",()=> console.log("Connected to database"))






app.listen(port, () => {
    console.log(`My Server is running on http://localhost:${port}`);
   }) 