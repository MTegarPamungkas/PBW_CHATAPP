/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  users: [{ type: String }],
  lastUpdate: { type: Number, required: true },
});

module.exports = mongoose.model('Room', roomSchema);