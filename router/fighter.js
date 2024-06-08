const express = require('express');
const router = express.Router({ mergeParams: true });
const pool = require('./db');

router.get('/', async function (req, res) {
    const template_suffix = res.locals.template_suffix;
    const fighters = (await pool.query('SELECT * FROM fighter')).rows;
    const behaviors = (await pool.query('SELECT * FROM behavior_tags')).rows;
    const backgrounds = (await pool.query('SELECT * FROM background_tags')).rows;
    const moves = (await pool.query('SELECT * FROM moves')).rows;
    res.render('fighters/' + template_suffix + 'Fighters', { fighters: fighters, behaviors: behaviors, backgrounds: backgrounds, moves: moves });
});

router.post('/', async function (req, res) {

});

module.exports = router;
