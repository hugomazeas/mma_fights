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
});
router.post('/strikes', async function (req, res) {
    let query = '';
    req.body.forEach(async strike => {
        query += `INSERT INTO public.relation_strike_round(sig_strike, striker_id, receiver_id, strike_code, round_id, fight_status) VALUES (${strike.sig_strike}, ${strike.striker_id}, ${strike.target_id}, '${strike.strike_code}', ${strike.round_id}, '${strike.fight_status}');`; 
    });
    await pool.query(query);
    return res.status(200).send('Simulation query sent');
});
module.exports = router;
