/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const User = require('../models/authModel');
const bcrypt = require('bcrypt');

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(201).json({ message: 'Invalid username or password' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(201).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: true, user: {_id: user._id, name: user.name, username: user.username} });
  } catch (error) {
    res.status(500).json({ message: 'username tidak ditemukan' });
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { name, username, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) return res.json({ msg: 'Username already used', status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      username,
      password: hashedPassword,
    });
    return res.json({msg: "Register Berhasil", status: 'Register Berhasil', user: user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getName = async (req, res, next) => {

  try {
    const username = req.params.username;
    // Cari semua pesan berdasarkan ruangan tertentu, diurutkan berdasarkan timestamp
    const detailUser = await User.findOne({ username });

    res.status(200).json({name: detailUser.name});
  } catch (error) {
    console.error('Error while retrieving listRoom:', error);
    // res.status(500).json({ message: 'Internal server error' });
    next(error);
  }


};

module.exports.searchUsername = async (req, res, next) => {
  const searchTerm = req.query.username;
  User.find({ username: { $regex: searchTerm, $options: 'i' } })
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      console.error('Error during search:', error);
      res.status(500).json({ error: 'An error occurred during search' });
    });

};