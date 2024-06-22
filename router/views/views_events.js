const express = require('express');
const router = express.Router({ mergeParams: true }); 

const { handleResponse } = require('../utility');
const Event = require('../../models/event');
const Fight = require('../../models/fight');

router.get('/', async function (req, res) {
    const events = await Event.get_all_events()
    handleResponse('events/events', req, res, { events: events });
});
router.get('/:event_id', async function (req, res) {
    const id = req.params.event_id;

    let event = await Event.get_event(id);
    let fights = await Fight.get_fights_by_event(id);
    
    handleResponse('events/detailEvent', req, res, { event: event, fights_of_event: fights });
});
module.exports = router;
