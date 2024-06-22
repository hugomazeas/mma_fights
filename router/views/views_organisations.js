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

module.exports = router;
