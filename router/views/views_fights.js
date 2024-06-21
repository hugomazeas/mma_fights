const express = require('express');
const router = express.Router({ mergeParams: true });

const { handleResponse } = require('../utility');
const Event = require('../../models/event');
const Fight = require('../../models/fight');
const Round = require('../../models/round');

router.get('/', async function (req, res) {
    const fights = await Fight.get_all_fights();
    handleResponse('registry/registry', req, res, { fights: fights });
});
router.get('/:fight_id', async function (req, res) {
    const id = parseInt(req.params.fight_id);

    let fight = await Fight.get_fight(id);
    fight.rounds = await Round.get_rounds_by_fight(id);
    handleResponse('fights/detailFight', req, res, { fight: fight});
});
module.exports = router;
