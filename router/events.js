const express = require('express');
const router = express.Router({ mergeParams: true });
const pool = require('./db');

router.get('/', async function (req, res) {
    let events;
    const template_suffix = res.locals.template_suffix;
    if (req.params.org_id == 0) {
        events = (await pool.query('SELECT event.*, organisation.name AS organisation_name FROM event JOIN organisation ON event.organisation_id = organisation.organisation_id')).rows;
    } else {
        events = (await pool.query('SELECT event.*, organisation.name AS organisation_name FROM event JOIN organisation ON event.organisation_id = organisation.organisation_id WHERE event.organisation_id = $1', [req.params.org_id])).rows;
    }
    const organisations = (await pool.query('SELECT * FROM organisation')).rows;
    const fighters = (await pool.query('SELECT fighter_id, CONCAT(first_name, \' \', last_name) as full_name FROM fighter ORDER BY full_name ASC')).rows;

    res.render('events/' + template_suffix + 'events', { events: events, organisations: organisations, fighters: fighters });
});

router.post('/', async function (req, res) {
    try {
        const event = req.body.event;
        const values = [event.name, event.date, event.organisation_id, event.location];
        await pool.query('INSERT INTO event (name, date, organisation_id, location) VALUES ($1, $2, $3, $4)', values);
        res.redirect('/events');
    } catch (error) {
        console.error("Error inserting data: ", error);
        res.status(500).send(error.toString());
    }
});

router.get('/:event_id', async function (req, res) {
    const event = (await pool.query('SELECT * FROM event WHERE event_id = $1', [req.params.event_id])).rows[0];
    const fights_of_event = (await pool.query(`
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
        WHERE event_id = $1;
    `, [req.params.event_id])).rows;
    const fighters = (await pool.query('SELECT fighter_id, CONCAT(first_name, \' \', last_name) as full_name FROM fighter ORDER BY full_name ASC')).rows;
    const template_suffix = res.locals.template_suffix;
    res.render('events/' + template_suffix + 'detailEvent', { organisation_id: req.params.org_id, event: event, fights_of_event: fights_of_event, fighters: fighters });
});

module.exports = router;
