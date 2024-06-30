const express = require('express');
const router = express.Router({ mergeParams: true });

const { handleResponse } = require('../utility');
const Fight = require('../../models/fight');
const Round = require('../../models/round');
const Strike = require('../../models/strike');

router.get('/', async function (req, res) {
    const fights = await Fight.get_all_fights();
    handleResponse('registry/registry', req, res, { fights: fights });
});
router.get('/:fight_id', async function (req, res) {
    const id = parseInt(req.params.fight_id);

    let fight = await Fight.get_fight(id);
    fight.rounds = await Round.get_rounds_by_fight(id);
    handleResponse('fights/detailFight', req, res, { fight: fight });
});
router.get('/:fight_id/details', async function (req, res) {

    const fight_id = parseInt(req.params.fight_id);
    const fight = (await Fight.get_fight(fight_id));
    const rounds = (await Round.get_rounds_by_fight(fight_id));
    const strikes = (await Strike.get_strikes_by_fight_id(fight_id));
    fight.rounds = rounds;
    fight.strikes = strikes;
    fight.rounds.forEach(element => {
        element.fighter1_strikes = strikes.filter(strike => strike.round_id === element.round_id && strike.striker_id === fight.fighter1_id);
        element.fighter2_strikes = strikes.filter(strike => strike.round_id === element.round_id && strike.striker_id === fight.fighter2_id);

        element.fighter1_accuracy = element.fighter1_strikes.filter(strike => strike.round_id === element.round_id && strike.sig_strike === true).length / element.fighter1_strikes.length;
        element.fighter2_accuracy = element.fighter2_strikes.filter(strike => strike.round_id === element.round_id && strike.sig_strike === true).length / element.fighter2_strikes.length;

    });
    console.log(fight);
    handleResponse('fights/detailFightRegistry', req, res, { fight: fight });
});
module.exports = router;
