/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const Room = require('../models/roomModel');
const moment = require('moment');

module.exports.addRoom = async (req, res, next) => {
  const { name, users } = req.body;

  // Cek keberadaan room dengan pengguna yang sama
  Room.findOne({ users: { $all: users } })
    .then(existingRoom => {
      if (existingRoom) {
        return res.status(400).json({ error: 'Room with the same users already exists' });
      }

      const newRoom = new Room({
        name,
        users,
        lastUpdate: moment().valueOf()
      });

      newRoom.save()
        .then(room => {
          res.json(room);
        })
        .catch(error => {
          console.error('Error while creating room:', error);
          res.status(500).json({ error: 'An error occurred while creating the room' });
        });
    })
    .catch(error => {
      console.error('Error while checking existing room:', error);
      res.status(500).json({ error: 'An error occurred while checking existing room' });
    });
};

module.exports.getListRoomUser = async (req, res, next) => {
  try {
    const username = req.params.username;
    // Cari semua pesan berdasarkan ruangan tertentu, diurutkan berdasarkan timestamp
    const listRoom = await Room.find({ users: { $in: [username] } });

    res.status(200).json(listRoom);
  } catch (error) {
    console.error('Error while retrieving listRoom:', error);
    // res.status(500).json({ message: 'Internal server error' });
    next(error);
  }
};
