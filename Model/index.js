const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Photos = new Schema({
    img:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now() + 3600000
    }
})
const Emailath = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
});
const EmailathSchema = mongoose.model("Emailath",Emailath);
const PhotosSchema = mongoose.model("Photosath",Photos);
module.exports = {
    PhotosSchema,
    EmailathSchema
};