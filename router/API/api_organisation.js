const express = require('express');
const router = express.Router({ mergeParams: true });
const pool = require('../db');

router.get('/:org_id', async function (req, res) {
    const org_id = req.params.org_id;
    const organisation = (await pool.query('SELECT * FROM organisation WHERE organisation_id = $1', [org_id])).rows
    res.send(organisation[0]);
});
router.get('/', async function (req, res) {
    const organisations = (await pool.query('SELECT * FROM organisation')).rows;
    res.send(organisations);
});
router.post('/', async function (req, res) {
    const organisation = req.body;
    const result = await pool.query('INSERT INTO organisation (name, headquarter, founded_year) VALUES ($1, $2, $3) RETURNING *', [organisation.name, organisation.headquarter, organisation.founded_year]);
    const createdOrganisation = result.rows[0];
    res.send(createdOrganisation);
});
router.delete('/:org_id', async function (req, res) {
    const org_id = req.params.org_id;
    await pool.query('DELETE FROM organisation WHERE organisation_id = $1', [org_id]);
    res.send('Organisation deleted');
});
module.exports = router;