const express = require('express');
const { signup, signin, signout, verfiyToken } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateBody } = require('../middleware/validate');
const { signupSchema, signinSchema } = require('../validation/schemas');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/sign-up', authLimiter, validateBody(signupSchema), signup);
router.post('/sign-in', authLimiter, validateBody(signinSchema), signin);
router.post('/sign-out', signout);
router.get('/verify', protect, verfiyToken);

module.exports = router;
