const express = require('express');
const router = express.Router({ mergeParams: true });
const pool = require('../db');

router.get('/', async function (req, res) {
    const fights = (await pool.query('SELECT * FROM fight')).rows;
    res.send(fights);
});
router.post('/', async function (req, res) {
    const fight = req.body;
    const result = await pool.query('INSERT INTO fight (event_id, fighter1_id, fighter2_id, division, round_length, number_round, card_type, ufc_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING fight_id', [fight.event_id, fight.fighter1_id, fight.fighter2_id, fight.division, fight.round_length, fight.number_rounds, fight.card_type, fight.ufc_number]);
    fight.fight_id = result.rows[0].fight_id;
    for (let i = 0; i < fight.number_round; i++) {
        await pool.query('INSERT INTO round (fight_id, round_number, max_duration) VALUES ($1, $2, $3)', [fight.fight_id, i + 1, fight.round_length]);
    }
    res.send(fight);
});
router.get('/:fight_id', async function (req, res) {
    const fight_id = parseInt(req.params.fight_id);
    let fight = (await pool.query('SELECT * FROM fight WHERE fight_id = $1', [fight_id])).rows[0];
    fight.rounds = [];
    let rounds = (await pool.query('SELECT * FROM round WHERE fight_id = $1', [fight_id])).rows;
    for (let i = 0; i < rounds.length; i++) {
        fight.rounds.push(rounds[i].round_id);
    }
    res.status(201).send(fight);
});
router.delete('/:fight_id', async function (req, res) {
    const fight_id = parseInt(req.params.fight_id);
    await pool.query('DELETE FROM round WHERE fight_id = $1', [fight_id]);
    await pool.query('DELETE FROM fight WHERE fight_id = $1', [fight_id]);
    res.send('Fight deleted');
});
router.get('/:fight_id/strikes', async function (req, res) {
    let rounds_ids = (await pool.query('SELECT round_id FROM public.round WHERE fight_id = $1;', [req.params.fight_id])).rows;
    const roundIds = rounds_ids.map(row => row.round_id);
    const placeholders = roundIds.map((_, index) => `$${index + 1}`).join(',');
    if(placeholders === '') {
        res.send([]);
        return;
    }
    const strikesResponse = await pool.query(`SELECT * FROM relation_strike_round WHERE round_id IN (${placeholders});`, roundIds);
    const strikes = strikesResponse.rows;
    res.send(strikes);
});
module.exports = router;