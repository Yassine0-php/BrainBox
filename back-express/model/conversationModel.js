const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({

    auteur:{
        type:String,
        required:true
    },

    contenu:{
        type:String,
        required:true
    },

    type:{
        type:String,
        enum:["user","ia"],
        required:true
    }

});


const conversationSchema = new mongoose.Schema({

    id:{
        type:Number,
        required:true,
        unique:true
    },

    titre:{
        type:String,
        required:true
    },

    messages:[
        messageSchema
    ],

    date:{
        type:Date,
        default:Date.now
    }

});


module.exports = mongoose.model(
    "Conversation",
    conversationSchema,
    "conversation"
);