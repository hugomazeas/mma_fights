const express = require('express');
const router = express.Router({ mergeParams: true });
const Organisation = require('../../models/organisation');

router.get('/:org_id', async function (req, res) {
    const org_id = req.params.org_id;
    const organisation = (await Organisation.get_organisation(org_id));
    res.send(organisation);
});
router.get('/', async function (req, res) {
    const organisations = (await Organisation.get_all_organisations());
    res.send(organisations);
});
router.post('/', async function (req, res) {
    const organisation = req.body;
    const result = await Organisation.add_organisation(organisation);
    // Does not return organisation object with id...
    res.send(result);
});
router.delete('/:org_id', async function (req, res) {
    const org_id = req.params.org_id;
    await Organisation.delete_organisation(org_id);
    res.send('Organisation deleted');
});
module.exports = router;