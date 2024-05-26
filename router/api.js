const express = require('express');
const router = express.Router({ mergeParams: true });
const pool = require('./db');

const Navbar = require('../models/navbar.js');

router.get('/fight/:fight_id/', async function (req, res) {
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
    console.log(rounds);
    fight.rounds = rounds;
    res.send(fight);
});
router.get('/columnInfo/:table_name/', async function (req, res) {
    const table_name = req.params.table_name;
    const columns = (await pool.query("SELECT * FROM get_column_comments('" + table_name + "');"));
    res.send(columns.rows);
});
router.get('/organisation/:org_id', async function (req, res) {
    const org_id = req.params.org_id;
    const organisation = (await pool.query('SELECT * FROM organisation WHERE organisation_id = $1', [org_id])).rows
    res.send(organisation[0]);
});
router.get('/event/:event_id', async function (req, res) {
    const event_id = req.params.event_id;
    const event = (await pool.query('SELECT * FROM event WHERE event_id = $1', [event_id])).rows
    res.send(event[0]);
});
router.get('/fighter/:fighter_id', async function (req, res) {
    const fighter_id = req.params.fighter_id;
    const fighter = (await pool.query('SELECT * FROM fighter WHERE fighter_id = $1', [fighter_id])).rows
    res.send(fighter[0]);
});
router.get('/navbar_item', async function (req, res) {
    let navbar = new Navbar();
    let db_navbar = (await pool.query('SELECT * FROM navbar')).rows;
    db_navbar.forEach(element => {
        navbar.addItem(element.name, element.onClick, element.icon);
    });
    res.render('partials/navBar', { navbar: navbar.getItems() });
});
router.get('/organisation', async function (req, res) {
    const organisations = (await pool.query('SELECT * FROM organisation')).rows;
    res.send(organisations);
});
router.get('/event', async function (req, res) {
    const events = (await pool.query('SELECT * FROM event')).rows;
    res.send(events);
});
router.get('/fighter', async function (req, res) {
    const fighters = (await pool.query('SELECT * FROM fighter')).rows;
    res.send(fighters);
});
router.get('/fight', async function (req, res) {
    const fights = (await pool.query('SELECT * FROM fight')).rows;
    res.send(fights);
});
router.get('/division', async function (req, res) {
    const divisions = (await pool.query('SELECT * FROM division')).rows;
    res.send(divisions);
});
router.get('/number_round', async function (req, res) {
    const number_rounds = (await pool.query('SELECT * FROM number_round')).rows;
    res.send(number_rounds);
});
router.get('/card_type', async function (req, res) {
    const card_types = (await pool.query('SELECT * FROM card_type')).rows;
    res.send(card_types);
});
router.get('/round_length', async function (req, res) {
    const round_lengths = (await pool.query('SELECT * FROM round_length')).rows;
    res.send(round_lengths);
});
router.post('/organisation', async function (req, res) {
    const organisation = req.body;
    await pool.query('INSERT INTO organisation (name, headquarter, founded_year) VALUES ($1, $2, $3)', [organisation.name, organisation.headquarter, organisation.founded_year]);
    res.send(organisation);
});
router.post('/fight', async function (req, res) {
    const fight = req.body;
    const result = await pool.query('INSERT INTO fight (event_id, fighter1_id, fighter2_id, division, round_length, number_round, card_type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING fight_id', [fight.event_id, fight.fighter1_id, fight.fighter2_id, fight.division, fight.round_length, fight.number_round, fight.card_type]);
    fight.fight_id = result.rows[0].fight_id;
    await pool.query('INSERT INTO fight (event_id, fighter1_id, fighter2_id, division, round_length, number_round, card_type) VALUES ($1, $2, $3, $4, $5, $6, $7)', [fight.event_id, fight.fighter1_id, fight.fighter2_id, fight.division, fight.round_length, fight.number_round, fight.card_type]);
    for (let i = 0; i < fight.number_round; i++) {
        await pool.query('INSERT INTO round (fight_id, round_number, max_duration) VALUES ($1, $2, $3)', [fight.fight_id, i + 1, fight.round_length]);
    }
    res.send(fight);
});
module.exports = router;
