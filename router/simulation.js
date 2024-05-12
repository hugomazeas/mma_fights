const express = require('express');
const router = express.Router({ mergeParams: true }); 
const pool = require('./db');

router.get('/', async function (req, res) {

});
router.post('/strikes', async function (req, res) {
    let query = '';
    req.body.forEach(async strike => {
        query += `INSERT INTO public.relation_strike_round(sig_strike, striker_id, target_id, strike_code, round_id, fight_status, round_time_in_s) VALUES (${strike.sig_strike}, ${strike.striker_id}, ${strike.target_id}, '${strike.strike_code}', ${strike.round_id}, '${strike.fight_status}', '${strike.round_time}');`;
    });
    await pool.query(query);
    return res.status(200).send('Simulation query sent');
});
module.exports = router;
