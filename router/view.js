const express = require('express');
const router = express.Router({ mergeParams: true }); 

const organisationRouter = require('./views/views_organisations');
const eventRouter = require('./views/views_events');
const fighterRouter = require('./views/views_fighters');
const fightRouter = require('./views/views_fights');
const simulationRouter = require('./views/views_simulations');

router.use('/organisations', organisationRouter);
router.use('/events', eventRouter);
router.use('/fighters', fighterRouter);
router.use('/fights', fightRouter);
router.use('/simulations', simulationRouter);

router.get('/', function (req, res) {
    res.status(200).send('Welcome to the views API. Please use the appropriate routes to access the data you need.');
});

module.exports = router;
