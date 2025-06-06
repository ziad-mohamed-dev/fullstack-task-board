const express = require('express');
const { signup, signin, signout, verfiyToken } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/sign-up', signup);
router.post('/sign-in', signin);
router.post('/sign-out', signout);
router.get('/verify', protect, verfiyToken);

module.exports = router;