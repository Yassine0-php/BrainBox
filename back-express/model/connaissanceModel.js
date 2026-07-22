const mongoose = require("mongoose");


const connaissanceSchema = new mongoose.Schema({

    id:Number,

    titre:String,

    contenu:String,

    categorie:String,

    tags:[String],

    date:{
        type:Date,
        default:Date.now
    }

});


module.exports = mongoose.model(
    "Connaissance",
    connaissanceSchema,
    "connaissance"
);