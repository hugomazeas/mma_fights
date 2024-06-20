const express = require('express');
const router = express.Router({ mergeParams: true });
const pool = require('../db');
const Event = require('../../models/event');

router.get('/', async function (req, res) {
    const events = await Event.get_all_events();
    res.send(events);
});
router.get('/:event_id', async function (req, res) {
    const event_id = req.params.event_id;
    const event = await Event.get_event(event_id);
    res.send(event[0]);
});
router.post('/', async function (req, res) {
    const event = req.body;
    const result = await pool.query('INSERT INTO event (organisation_id, name, date, location, description, photo_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING event_id', [parseInt(event.organisation_id), event.name, event.date, event.location, event.description, event?.photo_url]);
    event.event_id = result.rows[0].event_id;
    res.send(event);
});
router.delete('/:event_id', async function (req, res) {
    const event_id = req.params.event_id;
    const fights = (await pool.query('SELECT * FROM fight WHERE event_id = $1', [event_id])).rows;
    for (let i = 0; i < fights.length; i++) {
        await pool.query('DELETE FROM round WHERE fight_id = $1', [fights[i].fight_id]);
        await pool.query('DELETE FROM fight WHERE fight_id = $1', [fights[i].fight_id]);
    }
    await pool.query('DELETE FROM event WHERE event_id = $1', [event_id]);
    res.send('Event deleted');
});
module.exports = router;