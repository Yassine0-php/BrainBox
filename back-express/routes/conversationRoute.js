const express = require("express");

const router = express.Router();

const conversationController =
require("../controller/conversationController.js");


router.post(
"/",
conversationController.creerConversation
);


router.get(
"/",
conversationController.getConversations
);


router.get(
"/:id",
conversationController.getConversation
);


router.put(
"/:id",
conversationController.updateConversation
);


module.exports = router;