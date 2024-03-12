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
router.get('/:round_id', async function (req, res) {
    const organisation_id = req.params.org_id;
    const event_id = req.params.event_id;
    const fight_id = req.params.fight_id;
    const round_id = req.params.round_id;
    const round = (await pool.query('SELECT * FROM round WHERE round_id = $1', [round_id])).rows[0];
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
    
    res.render('detailRound', { fight: fight, round: round});
});
router.post('/:round_id/strikes', async function (req, res) {
    let round_id = req.params.round_id;
    console.log(req.body);
    try {
        
        const strike = req.body.strike;
        const values = [strike.strike_code, strike.striker_id, strike.target_id, strike.sig_strike, round_id, strike.fight_status];
        await pool.query('INSERT INTO relation_strike_round (strike_code, striker_id, target_id, sig_strike, round_id, fight_status) VALUES ($1, $2, $3, $4, $5, $6)', values);
        res.sendStatus(201);
    } catch (error) {
        console.error("Error inserting data: ", error);
        res.status(500).send(error.toString());
    }
});

module.exports = router;
