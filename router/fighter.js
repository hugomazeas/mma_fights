const express = require('express');
const router = express.Router({ mergeParams: true });
const pool = require('./db');

router.get('/', async function (req, res) {
    const fighters = (await pool.query('SELECT * FROM fighter')).rows;
    res.render('fighters', { fighters: fighters }); // Render events.ejs view
});

router.post('/', async function (req, res) {

});

module.exports = router;
