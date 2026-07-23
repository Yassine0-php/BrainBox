const Connaissance = require("../model/connaissanceModel.js");

// CREATE : créer une connaissance
exports.creerConnaissance = async (req, res) => {

    try {
        const {
            id,
            titre,
            contenu,
            categorie,
            tags
        } = req.body;

        const nouvelleConnaissance = await Connaissance.create({

            id,
            titre,
            contenu,
            categorie,
            tags

        });

        res.status(201).json({

            message: "Connaissance créée",
            connaissance: nouvelleConnaissance

        });

    } catch (error) {
        res.status(500).json({

            message: error.message

        });
    }

};

// 
// UPDATE : modifier une connaissance
exports.modifierConnaissance = async(req,res)=>{

    try{

        const connaissanceModifiee = await Connaissance.findOneAndUpdate(

            {
                id:req.params.id
            },


            {
                titre:req.body.titre,

                contenu:req.body.contenu,

                categorie:req.body.categorie,

                tags:req.body.tags
            },

            {
                new:true
            }
        );

        if(!connaissanceModifiee){

            return res.status(404).json({
                message:"Connaissance introuvable"
            });
        }

        res.json({

            message:"Connaissance modifiée",

            connaissance:connaissanceModifiee
        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });
   
    }
};


// GET : lister les connaissances
exports.listerConnaissances = async (req, res) => {

    try {

        const connaissances = await Connaissance.find();

        res.status(200).json(connaissances);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// DELETE : supprimer une connaissance
exports.supprimerConnaissance = async (req, res) => {

    try {

        const connaissanceSupprimee = await Connaissance.findOneAndDelete({
            id: req.params.id
        });

        if (!connaissanceSupprimee) {
            return res.status(404).json({
                message: "Connaissance introuvable"
            });
        }

        res.status(200).json({
            message: "Connaissance supprimée",
            connaissance: connaissanceSupprimee
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET : consulter une connaissance par son id
exports.consulterConnaissance = async (req, res) => {

    try {

        const connaissance = await Connaissance.findOne({
            id: Number(req.params.id)
        });

        if (!connaissance) {
            return res.status(404).json({
                message: "Connaissance introuvable"
            });
        }

        res.status(200).json(connaissance);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};