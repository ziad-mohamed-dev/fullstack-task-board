const express = require('express');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
});

module.exports = router;