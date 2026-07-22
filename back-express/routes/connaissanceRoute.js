const express = require("express");

const router = express.Router();

const connaissanceController = require("../controller/connaissanceController.js");

// Créer une connaissance
router.post(
    "/",
    connaissanceController.creerConnaissance
);

router.put(
    "/:id",
    connaissanceController.modifierConnaissance
);

router.get(
    "/",
    connaissanceController.listerConnaissances
);

module.exports = router;