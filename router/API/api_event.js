const express = require('express');
const router = express.Router({ mergeParams: true });

const Event = require('../../models/event');
const Fight = require('../../models/fight');
const Round = require('../../models/round');

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
    const result = (await Event.add_event(event));
    console.log(result);
    event.event_id = result.event_id;
    res.send(event);
});
router.delete('/:event_id', async function (req, res) {
    const event_id = req.params.event_id;
    const fights = (await Fight.get_fights_by_event(event_id));
    for (let i = 0; i < fights.length; i++) {
        (await Round.delete_rounds_by_fight(fights[i].fight_id));
        (await Fight.delete_fight(fights[i].fight_id));
    }
    await Event.delete_event(event_id);
    res.send('Event deleted');
});
router.put('/:event_id', async function (req, res) {
    const event_id = req.params.event_id;
    const event = req.body;
    await Event.update_event(event_id, event);
    res.send(event);
});
module.exports = router;