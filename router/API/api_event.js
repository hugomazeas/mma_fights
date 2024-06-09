const express = require('express');
const router = express.Router({ mergeParams: true });
const pool = require('../db');

router.get('/:event_id', async function (req, res) {
    const event_id = req.params.event_id;
    const event = (await pool.query('SELECT * FROM event WHERE event_id = $1', [event_id])).rows
    res.send(event[0]);
});
router.get('/', async function (req, res) {
    const events = (await pool.query('SELECT * FROM event')).rows;
    res.send(events);
});
router.post('/', async function (req, res) {
    const event = req.body;
    const result = await pool.query('INSERT INTO event (organisation_id, name, date, location, description, photo_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING event_id', [parseInt(event.organisation_id), event.name, event.date, event.location, event.description, event?.photo_url]);
    event.event_id = result.rows[0].event_id;
    res.send(event);
});
router.delete('/:event_id', async function (req, res) {
    const event_id = req.params.event_id;
    await pool.query('DELETE FROM event WHERE event_id = $1', [event_id]);
    res.send('Event deleted');
});
module.exports = router;