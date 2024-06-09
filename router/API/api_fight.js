const express = require('express');
const router = express.Router({ mergeParams: true });
const pool = require('../db');

router.get('/', async function (req, res) {
    const fights = (await pool.query('SELECT * FROM fight')).rows;
    res.send(fights);
});
router.post('/', async function (req, res) {
    const fight = req.body;
    const result = await pool.query('INSERT INTO fight (event_id, fighter1_id, fighter2_id, division, round_length, number_round, card_type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING fight_id', [fight.event_id, fight.fighter1_id, fight.fighter2_id, fight.division, fight.round_length, fight.number_round, fight.card_type]);
    fight.fight_id = result.rows[0].fight_id;
    await pool.query('INSERT INTO fight (event_id, fighter1_id, fighter2_id, division, round_length, number_round, card_type) VALUES ($1, $2, $3, $4, $5, $6, $7)', [fight.event_id, fight.fighter1_id, fight.fighter2_id, fight.division, fight.round_length, fight.number_round, fight.card_type]);
    for (let i = 0; i < fight.number_round; i++) {
        await pool.query('INSERT INTO round (fight_id, round_number, max_duration) VALUES ($1, $2, $3)', [fight.fight_id, i + 1, fight.round_length]);
    }
    res.send(fight);
});
router.get('/:fight_id/', async function (req, res) {
    try {
        const fight_id = req.params.fight_id;
        let fight = (await pool.query(`
        SELECT fight.*, 
            fighter1.first_name AS fighter1_first_name, 
            fighter1.last_name AS fighter1_last_name, 
            fighter2.first_name AS fighter2_first_name, 
            fighter2.last_name AS fighter2_last_name,
            winner.first_name AS winner_first_name,
            winner.last_name AS winner_last_name
        FROM fight 
        JOIN fighter AS fighter1 ON fight.fighter1_id = fighter1.fighter_id 
        JOIN fighter AS fighter2 ON fight.fighter2_id = fighter2.fighter_id
        LEFT JOIN fighter AS winner ON fight.winner_id = winner.fighter_id
        WHERE fight_id = $1
    `, [fight_id])).rows[0];

        const rounds = (await pool.query('SELECT round_id FROM public.round WHERE fight_id = $1', [fight_id])).rows.map(row => row.round_id);
        fight.rounds = rounds;
        res.send(fight);
    } catch (error) {
        throw QueryError;
    }
});
router.delete('/:fight_id', async function (req, res) {
    const fight_id = parseInt(req.params.fight_id);
    await pool.query('DELETE FROM round WHERE fight_id = $1', [fight_id]);
    await pool.query('DELETE FROM fight WHERE fight_id = $1', [fight_id]);
    res.send('Fight deleted');
});
module.exports = router;