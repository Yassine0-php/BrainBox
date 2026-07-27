const axios = require("axios");

const connaissanceService = require("../services/connaissanceService");


exports.questionIA = async (req, res) => {

    try {

        const { question } = req.body;


        // Recherche des connaissances dans MongoDB
        const connaissances =
            await connaissanceService.rechercher(question);



        // Si aucune connaissance trouvée
        if (connaissances.length === 0) {

            return res.json({
                reponse: "Je n'ai pas cette information dans ma base de connaissances.",
                connaissances_utilisees: []
            });

        }



        // Création du contexte à envoyer à Mistral
        const contexte = connaissances
            .map(k =>
`
Titre : ${k.titre}

Catégorie : ${k.categorie}

Contenu :
${k.contenu}

Tags :
${k.tags.join(", ")}
`
            )
            .join("\n----------------\n");



        // Prompt RAG
        const prompt = `
Tu es un assistant IA spécialisé.

Tu dois répondre uniquement avec les informations présentes dans le contexte.

Si la réponse n'est pas présente dans le contexte, réponds :
"Je n'ai pas cette information dans ma base de connaissances."


Contexte :

${contexte}


Question utilisateur :

${question}


Réponds de manière concise (maximum 5 phrases).
`;



        // Appel Ollama
        const response = await axios.post(
            "http://ollama:11434/api/generate",
            {
                model: "mistral",
                prompt: prompt,
                stream: false,
                options: {
                    num_predict: 150
                }
            }
        );


        res.json({

            reponse: response.data.response,

            connaissances_utilisees: connaissances

        });



    } catch(error) {

        console.log(error.message);

        res.status(500).json({
            message: "Erreur lors de l'appel à l'assistant IA"
        });

    }

};