const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');
const keys = require('../config/keys');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const payload = { id: user.id, name: user.name };
        const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: '10s' });
        res.send({ token: `Bearer ${token}`, user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/check_token', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ valid: true });
});
router.post('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    addToBlacklist(token);
    res.json({ success: true, message: 'Logged out successfully' });
});
router.get('/login', async (req, res) => {
    const template_suffix = res.locals.template_suffix;
    res.render(`authentification/${template_suffix}login`);
});

// Protected route example
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user);
});

module.exports = router;
