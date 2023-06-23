/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const Message = require('../models/messagesModel');
const User = require('../models/authModel');
const moment = require('moment');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.addMessage = async (req, res, next) => {
  try {
    const { room, sender, content } = req.body;
    const findSender = await User.findById(sender);
    if (!findSender) {
      throw new Error('Invalid sender');
    }
    // Simpan pesan baru ke database
    const newMessage = new Message({ room, sender, content });
    await newMessage.save();
    // Kirim pesan ke semua client yang terhubung, termasuk pengirimnya
    // io.emit('receiveMessage', newMessage);
    res.status(201).json({ message: 'Message sent' });
  } catch (error) {
    console.error('Error while sending message:', error);
    next(error);
    // res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.getMessageRoom = async (req, res, next) => {
  try {
    const room = req.params.room;
    // Cari semua pesan berdasarkan ruangan tertentu, diurutkan berdasarkan timestamp
    const messages = await Message.find({ room })
      // .sort({ lastUpdate: -1 })
      .populate('sender', 'username') // Populate sender field with username
      .select('sender content')
      .exec();

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error while retrieving messages:', error);
    res.status(500).json({ message: 'Internal server error' });
    // next(error);
  }
};

module.exports.getLatMessageRoom = async (req, res, next) => {
  try {
    const room = req.params.room;
    // Cari semua pesan berdasarkan ruangan tertentu, diurutkan berdasarkan timestamp
    const messages = await Message.findOne({ room })
    .populate('sender', 'username')
      .select('sender content')
      .sort({ _id: -1 })
      .exec();

    const id = messages._id;
    const timestamp = new ObjectId(id).getTimestamp();
    // console.log(timestamp);

    const now = moment();

    // Membuat objek Moment dari timestamp
    const timestampMoment = moment(timestamp);

    // Menghitung selisih waktu antara sekarang dan timestamp dalam menit
    const duration = moment.duration(now.diff(timestampMoment));
    const minutesDiff = duration.asMinutes();

    // Mengubah selisih waktu dalam menit menjadi jam jika melebihi 60 menit
    let formattedDiff;
    if (minutesDiff >= 1440) {
      const daysDiff = Math.ceil(minutesDiff / 1440);
      formattedDiff = `${daysDiff} hari`;
    } else if (minutesDiff >= 60) {
      const hoursDiff = Math.ceil(minutesDiff / 60);
      console.log(Math.ceil(hoursDiff))
      
    } else {
      formattedDiff = `${Math.ceil(minutesDiff)} menit`;
    }

    res.status(200).json({ messages: messages, lastTime: formattedDiff });
  } catch (error) {
    console.error('Error while retrieving messages:', error);
    res.status(500).json({ message: 'Internal server error' });
    // next(error);
  }
};
