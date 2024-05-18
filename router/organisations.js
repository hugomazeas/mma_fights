const express = require('express');
const router = express.Router({ mergeParams: true });
const pool = require('./db');

router.get('/', async function (req, res) {
    const organisations = (await pool.query('SELECT * FROM organisation')).rows;
    const template_suffix = res.locals.template_suffix;
    res.render('organisations/' + template_suffix + 'organisations', { organisations: organisations });
});
router.get('/:org_id', async function (req, res) {
    const id = req.params.org_id;
    const template_suffix = res.locals.template_suffix;
    let organisation;
    let events;
    if (id == 0) {
        events = (await pool.query('SELECT * FROM event')).rows;
        organisation = (await pool.query(`SELECT o.*, (SELECT COUNT(*) FROM event WHERE organisation_id = o.organisation_id) AS event_count
                            FROM organisation AS o`)).rows;
    } else {
        organisation = (await pool.query(`SELECT o.*, (SELECT COUNT(*) FROM event WHERE organisation_id = o.organisation_id) AS event_count
                            FROM organisation AS o where organisation_id = $1;`, [id])).rows;
        events = (await pool.query('SELECT * FROM event WHERE organisation_id = $1', [id])).rows;
    }

    if (id == 0) {
        res.render('events/' + template_suffix + 'Events', { organisation: organisation[0], events: events });
    } else {
        res.render('organisations/' + template_suffix + 'detailOrganisation', { organisation: organisation[0], events: events });
    }
});
router.post('/', async function (req, res) {
    try {
        const organisation = req.body.organisation;
        const values = [organisation.name, organisation.headquarters, organisation.foundedYear];
        await pool.query('INSERT INTO organisation (name, headquarters, founded_year) VALUES ($1, $2, $3)', values);
        res.status(201).send("Organisation added successfully");
    } catch (error) {
        console.error("Error inserting data: ", error);
        res.status(500).send(error.toString());
    }
});
router.put('/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const organisation = req.body.organisation;
        const values = [organisation.name, organisation.headquarters, organisation.foundedYear, id];
        await pool.query('UPDATE organisation SET name = $1, headquarters = $2, founded_year = $3 WHERE organisation_id = $4', values);
        res.status(200).send("Organisation updated successfully");
    } catch (error) {
        console.error("Error updating data: ", error);
        res.status(500).send(error.toString());
    }
});
router.delete('/:id', async function (req, res) {
    try {
        const id = req.params.id;
        await pool.query('DELETE FROM organisation WHERE organisation_id = $1', [id]);
        res.status(200).send("Organisation deleted successfully");
    } catch (error) {
        console.error("Error deleting data: ", error);
        res.status(500).send(error.toString());
    }
});

module.exports = router;
