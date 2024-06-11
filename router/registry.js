const express = require('express');
const router = express.Router({ mergeParams: true });
const pool = require('./db');
const Fight = require('../models/fight');


router.get('/', async function (req, res) {
    const template_suffix = res.locals.template_suffix;
    const organisation_id = req.params.org_id;
    const event_id = req.params.event_id;
    const fight_id = req.params.fight_id;
    const fights = await Fight.get_all_fights();
    const rounds = (await pool.query('SELECT * FROM public.round WHERE fight_id = $1', [fight_id])).rows;
    res.render('registry/' + template_suffix + 'Registry', { organisation_id: organisation_id, event_id: event_id, rounds: rounds, fights: fights.rows});
});
module.exports = router;
