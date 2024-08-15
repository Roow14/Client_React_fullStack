const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', authenticateToken, getAllUsers);

module.exports = router;
