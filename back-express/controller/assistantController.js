const axios = require("axios");

exports.questionIA = async (req, res) => {

    try {

        const { question } = req.body;


        const response = await axios.post(
            "http://ollama:11434/api/generate",
            {
                model: "mistral",
                prompt: question,
                stream: false
            }
        );


        res.json({
            reponse: response.data.response
        });


    } catch(error) {

        console.log(error.message);

        res.status(500).json({
            message: "Erreur lors de l'appel à Ollama"
        });
    }
};