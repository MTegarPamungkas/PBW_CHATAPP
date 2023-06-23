/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
const { addMessage, getMessageRoom, getLatMessageRoom } = require("../controllers/messagesController");
const router = require("express").Router();

router.post("/add", addMessage);
router.get("/get/:room", getMessageRoom);
router.get("/getLastMessage/:room", getLatMessageRoom);

module.exports = router;