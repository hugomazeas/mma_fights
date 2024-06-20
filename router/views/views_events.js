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
router.post('/', async function (req, res) {
    try {
        const event = req.body.event;
        let result_event = await Event.add_event(event);
        res.status(201).send(result_event);
    } catch (error) {
        console.error("Error inserting data: ", error);
        res.status(500).send(error.toString());
    }
});
router.put('/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const event = req.body.event;
        let result_event = await Event.update_event(id, event);
        res.status(200).send(result_event);
    } catch (error) {
        console.error("Error updating data: ", error);
        res.status(500).send(error.toString());
    }
});
router.delete('/:id', async function (req, res) {
    try {
        const id = req.params.id;
        await Event.delete_event(id);
        res.status(200).send("Event deleted successfully");
    } catch (error) {
        console.error("Error deleting data: ", error);
        res.status(500).send(error.toString());
    }
});
module.exports = router;
