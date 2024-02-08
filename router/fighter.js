const express = require('express');
const router = express.Router({ mergeParams: true });
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'admin',
    port: 5432,
});

router.get('/', async function (req, res) {
    const fighters = (await pool.query('SELECT * FROM fighter')).rows;
    res.render('fighters', { fighters: fighters }); // Render events.ejs view
});

router.post('/', async function (req, res) {

});

module.exports = router;
