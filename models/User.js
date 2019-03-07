const mongoose = require('mongoose');
const Schema = mongoose.Schema;
////creat schema 

const Userschema = new Schema({
    name: {
        type : String,
        required:true
    },
    email: {
        type : String ,
        required:true,
        unique: 'Two users cannot share the same username ({VALUE})'
    },
     avatar: {
         type : String,    },
    date: {
        type:Date,
        default:Date.now      
    },
    password: {
        type:String,
        required:true
    },

});


module.exports = User = mongoose.model('User',Userschema)