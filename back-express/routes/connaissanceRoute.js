console.log("Fichier connaissanceRoute chargé");
const express = require("express");

const router = express.Router();

const connaissanceController = require("../controller/connaissanceController.js");

// Créer une connaissance
router.post(
    "/",
    connaissanceController.creerConnaissance
);

// modifier une connaissance
router.put(
    "/:id",
    connaissanceController.modifierConnaissance
);

//lister les connaissances
router.get(
    "/",
    connaissanceController.listerConnaissances
);

// supprimer une connaissance
router.delete(
    "/:id",
    connaissanceController.supprimerConnaissance
);

// consulter une connaissance
router.get(
    "/:id",
    connaissanceController.consulterConnaissance
);
module.exports = router;