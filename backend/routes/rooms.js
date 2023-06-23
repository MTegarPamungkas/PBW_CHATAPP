/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
const { addRoom, getListRoomUser } = require("../controllers/roomController");
const router = require("express").Router();

router.post("/add", addRoom);
router.get("/list/:username", getListRoomUser);


module.exports = router;