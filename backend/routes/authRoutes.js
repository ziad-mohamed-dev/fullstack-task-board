const express = require('express');
const { signup, signin, signout } = require('../controllers/authController');

const router = express.Router();

router.post('/sign-up', signup);
router.post('/sign-in', signin);
router.post('/sign-out', signout);

module.exports = router;