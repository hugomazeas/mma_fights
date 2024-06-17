const express = require('express');
const router = express.Router({ mergeParams: true });
const pool = require('../db');
router.get('/:fighter_id', async function (req, res) {
    const fighter_id = req.params.fighter_id;
    const fighter = (await pool.query('SELECT * FROM fighter WHERE fighter_id = $1', [fighter_id])).rows
    if (fighter.length === 0) {
        return res.status(404).send('Fighter not found');
    }
    res.status(200).send(fighter[0]);
});

router.get('/', async function (req, res) {
    const fighters = (await pool.query('SELECT * FROM fighter')).rows;
    res.status(200).send(fighters);
});

router.post("/", async function (req, res) {
    const fighter = req.body;
    await pool.query('INSERT INTO fighter (first_name, last_name, nickname, weight, height, stance, reach, background, behavior_tags, moves_tags, full_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [fighter.first_name, fighter.last_name, fighter.nickname, fighter?.weight, fighter?.height, fighter?.stance, fighter?.reach, fighter?.background, fighter?.behavior_tags, fighter?.moves_tags, fighter.full_name]);
    res.status(201).send(fighter);
});

router.delete('/:fighter_id', async function (req, res) {
    const fighter_id = parseInt(req.params.fighter_id);
    await pool.query('DELETE FROM fighter WHERE fighter_id = $1', [fighter_id]);
    res.status(204).send();
});
module.exports = router;