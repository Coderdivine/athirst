
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");
//process.env.AUTH_URI ||
//mongodb://localhost:27017/athirst
mongoose.connect(process.env.AUTH_URI);
const port = process.env.PORT || 5099;
const db = mongoose.connection;
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  secure: true,
  cloud_name: 'axgura', 
  api_key:process.env.API_KEY, 
  api_secret:process.env.API_SK,
});
db.on("error",(err)=>{console.log(err)})
db.once("open",()=> console.log("Connected to database"))
const { PhotosSchema,EmailathSchema} = require("./Model/index.js")
app.post("/post-img",(req,res)=>{
    // const formData = FormData();
    // const imgs = formData.append("img","./Model/ngo")
    let {img} = req.body;
    UploadImage(img).then(result=>{
        const PhotosSchemas = new PhotosSchema({
            img:result,
            date:Date.now()
        });
        PhotosSchemas.save().then(corn=>{
            res.status(201).json({
                message:"Image saved",
                status:201
            })
        })
    }).catch(err=>{
            res.status(400).json({
                message:err,
                status:400
            })
        })
});
app.get("/get-img",(req,res)=>{
   PhotosSchema.find().then(result=>{
    if(!result.length){
        res.status(400).json({
            message:"No image found",
            status:400
        })
    }else{
        res.status(200).json({
            message:"Image found",
            data:result
        })
    }
   })
});
app.post("/post-mail",(req,res)=>{
    let {name,email,message} = req.body;
    const EmailathSchemas =new EmailathSchema({
        name,
        email,
        message
    });
    EmailathSchemas.save().then(corn=>{
        res.status(201).json({
            message:"Image saved",
            status:201
        })
    })
})
app.get("/get-mail",(req,res)=>{
    EmailathSchema.find().then(corn=>{
        if(!corn){
            res.status(400).json({
                message:"No response found",
                status:400
            })
        }else{
            res.status(200).json({
                message:"Response found",
                data:corn
            })
        }
    })
})
async function UploadImage(imagePath){
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };
  
      try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);
        console.log(result);
        return result.public_id;
      } catch (error) {
        console.error(error);
      }
}
app.listen(port, () => {
    console.log(`My Server is running on http://localhost:${port}`);
   });
