const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Login
router.post('/login', async (req, res) => {

  const { password, email } = req.body;

  try {
    let user;
    user = await User.findOne({ email }).select("-password");

    if(user == null) {
      return res.status(401).json({ message: 'Invalidate email or name (email - to delete)' })
    }

    user = await User.findOne({ email, password }).select("-password");

    if (user) {
      // create jsonwebtoken and add it to tokens array
      const token = jwt.sign({ email }, process.env.JWT_KEY);

      user.tokens.push(token);
      await user.save();

      return res.status(200).send(user);
    } else {
      return res.status(401).json({ message: 'Invalidate email or name (password - to delete)' })
    }

  } catch ({ message }) {
    res.status(500).json({
      message,
    });
  }
});

// Register
router.post('/register', async (req, res) => {

  try {
    const user = await User.create({ ...req.body, role: 'user' });
    const token = jwt.sign({ email }, process.env.JWT_KEY);
    user.tokens.push(token);
    res.json(user);
  } catch ({ message }) {
    res.status(500).json({
      message,
    });
  }
});

// Delete user
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const user = await User.findById(id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found'});
    }
    await user.delete();
    return res.status(200).json({ message: 'User successfully removed' })
  } catch ({ message }) {
    res.status(500).json({
      message,
    });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch ({ message }) {
    res.status(500).json({
      message,
    });
  }
});

// Get one user
router.get('/:id', getUser, (req, res) => {
  res.json(req.user)
});

async function getUser(req, res, next) {
  let user;

  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({
        message: 'Cannot find user'
      })
    }
  } catch ({ message }) {
    res.status(500).json({ message });
  };

  req.user = user;
  next();
};

module.exports = router;
