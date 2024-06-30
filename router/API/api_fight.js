const express = require('express');
const router = express.Router({ mergeParams: true });
const Fight = require('../../models/fight');
const Round = require('../../models/round');
const Strike = require('../../models/strike');

router.get('/', async function (req, res) {
    const fights = (await Fight.get_all_fights_raw());
    res.send(fights);
});
router.post('/', async function (req, res) {
    const fight = req.body;
    const result = (await Fight.add_fight(fight));
    result.rounds = [];
    for (let i = 0; i < result.number_round; i++) {
        result.rounds.push((await Round.add_round({ round_number: i + 1, fight_id: result.fight_id, round_length: 0, max_duration: fight.round_length })).rows[0]);
    }
    res.status(201).send(fight);
});
router.get('/:fight_id', async function (req, res) {
    const fight_id = parseInt(req.params.fight_id);
    let fight = (await Fight.get_all_fights_raw()).find(fight => fight.fight_id === fight_id);
    fight.rounds = [];
    let rounds = (await Round.get_rounds_by_fight(fight_id));
    for (let i = 0; i < rounds.length; i++) {
        fight.rounds.push(rounds[i].round_id);
    }
    res.status(200).send(fight);
});
router.delete('/:fight_id', async function (req, res) {
    const fight_id = parseInt(req.params.fight_id);
    await Fight.delete_fight(fight_id);
    await Round.delete_rounds_by_fight(fight_id);
    res.status(204).send('Fight deleted');
});
router.get('/:fight_id/strikes', async function (req, res) {
    const fight_id = parseInt(req.params.fight_id);
    const strikes = (await Strike.get_strikes_by_fight_id(fight_id));
    if (strikes.length == 0) {
        res.send([]);
        return;
    }
    res.send(strikes);
});
module.exports = router;