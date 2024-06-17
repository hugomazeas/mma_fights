const express = require('express');
const router = express.Router({ mergeParams: true });
const pool = require('./db');
const Fight = require('../models/fight');


router.get('/', async function (req, res) {
    const template_suffix = res.locals.template_suffix;
    const fights = await Fight.get_all_fights();
    console.log(fights.rows)
    res.render('registry/' + template_suffix + 'Registry', { fights: fights.rows });
});
module.exports = router;
