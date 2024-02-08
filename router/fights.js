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
    const rounds = (await pool.query('SELECT * FROM public.fighter')).rows;
    res.send(rounds); // Render events.ejs view
});
router.get('/:fight_id', async function (req, res) {
    const organisation_id = req.params.org_id;
    const event_id = req.params.event_id;
    const fight_id = req.params.fight_id;
    const fight = (await pool.query(`
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

    const rounds = (await pool.query('SELECT * FROM public.round WHERE fight_id = $1', [fight_id])).rows;
    let strike_fighter1_to_fighter2 = (await pool.query(
        'SELECT * FROM public.relation_strike_round WHERE sig_strike = true AND striker_id = $1 AND receiver_id = $2', [fight.fighter1_id, fight.fighter2_id])).rows;
    let strike_fighter2_to_fighter1 = (await pool.query(
        'SELECT * FROM public.relation_strike_round WHERE sig_strike = true AND striker_id = $1 AND receiver_id = $2', [fight.fighter2_id, fight.fighter1_id])).rows;

    res.render('detailFight', { organisation_id: organisation_id, event_id: event_id, rounds: rounds, fight: fight });
});
router.get('/:fight_id/api', async function (req, res) {
    const fight_id = req.params.fight_id;
    const fight = (await pool.query(`
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
    res.send(fight);
});

router.get('/:fight_id/strikes', async function (req, res) {
    let rounds_ids = (await pool.query('SELECT round_id FROM public.round WHERE fight_id = $1;', [req.params.fight_id])).rows;
    const roundIds = rounds_ids.map(row => row.round_id);
    const placeholders = roundIds.map((_, index) => `$${index + 1}`).join(',');

    const strikesResponse = await pool.query(`SELECT * FROM relation_strike_round WHERE round_id IN (${placeholders});`, roundIds);
    const strikes = strikesResponse.rows;
    res.send(strikes);
});

router.post('/', async function (req, res) {
    const fight = req.body.fight;
    const newFight = (await pool.query(`
        INSERT INTO public.fight (event_id, fighter1_id, fighter2_id, winner_id, division, card_type, fighter1_odds, fighter2_odds)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `,
        [fight?.event_id, fight?.fighter1_id, fight?.fighter2_id, fight?.winner_id, fight?.division, fight?.card_type, fight?.fighter1_odds, fight?.fighter2_odds])).rows[0];
    res.send(newFight);
});
router.delete('/:id', async function (req, res) {
    const fight = (await pool.query('DELETE FROM public.fight WHERE fight_id = $1 RETURNING *;', [req.params.id])).rows[0];
    res.send(fight);
});
module.exports = router;
