const express = require("express");
const router = express.Router();

const iaController = require("../controller/assistantController.js");


router.post("/question", iaController.questionIA);


module.exports = router;