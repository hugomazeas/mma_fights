const express = require('express');
const router = express.Router({ mergeParams: true });

const { handleResponse } = require('../utility');
const Organisation = require('../../models/organisation');
const Event = require('../../models/event');

router.get('/', async function (req, res) {
    const organisations = await Organisation.get_all_organisations();
    handleResponse('organisations/organisations', req, res, { organisations: organisations });
});
router.get('/:org_id', async function (req, res) {
    const id = req.params.org_id;

    let organisation = await Organisation.get_organisation(id);
    let events = await Event.get_events_by_organisation(id);

    handleResponse('organisations/detailOrganisation', req, res, { organisation: organisation, events: events });
});
router.post('/', async function (req, res) {
    try {
        const organisation = req.body.organisation;
        let result_organisation = await Organisation.add_organisation(organisation);
        res.status(201).send(result_organisation);
    } catch (error) {
        console.error("Error inserting data: ", error);
        res.status(500).send(error.toString());
    }
});
router.put('/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const organisation = req.body.organisation;
        let result_organisation = await Organisation.update_organisation(id, organisation);
        res.status(200).send(result_organisation);
    } catch (error) {
        console.error("Error updating data: ", error);
        res.status(500).send(error.toString());
    }
});
router.delete('/:id', async function (req, res) {
    try {
        const id = req.params.id;
        await Organisation.delete_organisation(id);
        res.status(200).send("Organisation deleted successfully");
    } catch (error) {
        console.error("Error deleting data: ", error);
        res.status(500).send(error.toString());
    }
});

module.exports = router;
