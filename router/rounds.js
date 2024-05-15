const express = require('express');
const router = express.Router({ mergeParams: true });
const pool = require('./db');

router.get('/', async function (req, res) {
    const fighters = (await pool.query('SELECT * FROM fighter')).rows;
    res.render('fighters', { fighters: fighters }); // Render events.ejs view
});
router.get('/:round_id', async function (req, res) {
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

module.exports = router;
