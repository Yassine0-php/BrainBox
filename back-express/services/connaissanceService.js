const Connaissance = require("../model/connaissanceModel.js");


exports.rechercher = async (question) => {

    const mots = question
        .toLowerCase()
        .split(" ");


    const connaissances = await Connaissance.find({
        $or: [
            {
                titre: {
                    $regex: mots.join("|"),
                    $options: "i"
                }
            },
            {
                contenu: {
                    $regex: mots.join("|"),
                    $options: "i"
                }
            },
            {
                tags: {
                    $regex: mots.join("|"),
                    $options: "i"
                }
            }
        ]
    });


    return connaissances;

};