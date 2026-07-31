const Conversation = require("../model/conversationModel.js");


exports.creerConversation = async(req,res)=>{

    try{

        const conversation =
        new Conversation(req.body);

        await conversation.save();

        res.json(conversation);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



exports.getConversations = async(req,res)=>{

    try{

        const conversations =
        await Conversation.find();

        res.json(conversations);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



exports.getConversation = async(req,res)=>{

    try{

        const conversation =
        await Conversation.findOne({
            id:req.params.id
        });

        res.json(conversation);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



exports.updateConversation = async(req,res)=>{

    try{

        const conversation =
        await Conversation.findOneAndUpdate(
            {
                id:req.params.id
            },
            req.body,
            {
                new:true
            }
        );


        res.json(conversation);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};

exports.deleteConversation = async(req,res)=>{

    try{

        console.log("ID reçu :", req.params.id);


        const conversation =
        await Conversation.findByIdAndDelete(
            req.params.id
        );


        if(!conversation){

            return res.status(404).json({
                message:"Conversation introuvable"
            });

        }


        res.json({
            message:"Conversation supprimée"
        });


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};