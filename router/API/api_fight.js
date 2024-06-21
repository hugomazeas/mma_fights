const express = require('express');
const router = express.Router({ mergeParams: true });
const pool = require('../db');
const Fight = require('../../models/fight');
const Round = require('../../models/round');    
const Strike = require('../../models/strike');

router.get('/', async function (req, res) {
    const fights = Fight.get_all_fights_raw();
    res.send(fights);
});
router.post('/', async function (req, res) {
    const fight = req.body;
    const result = (await Fight.add_fight(fight));
    result.rounds = [];
    for(let i = 0; i < result.number_round; i++) {
        result.rounds.push((await Round.add_round({round_number: i + 1, fight_id: result.fight_id, round_length: 0, max_duration: fight.round_length})).rows[0]);
    }
    res.status(201).send(fight);
});
router.get('/:fight_id', async function (req, res) {
    const fight_id = parseInt(req.params.fight_id);
    let fight = (await Fight.get_fight(fight_id));
    fight.rounds = [];
    let rounds = (await Round.get_rounds_by_fight(fight_id));
    for (let i = 0; i < rounds.length; i++) {
        fight.rounds.push(rounds[i].round_id);
    }
    console.log(fight);
    res.status(204).send(fight[0]);
});
router.delete('/:fight_id', async function (req, res) {
    const fight_id = parseInt(req.params.fight_id);
    await Fight.delete_fight(fight_id);
    await Round.delete_rounds_by_fight(fight_id);
    res.status(202).send('Fight deleted');
});
router.get('/:fight_id/strikes', async function (req, res) {
    const fight_id = parseInt(req.params.fight_id);
    const strikes = (await Strike.get_strikes_by_fight_id(fight_id));
    res.send(strikes);
});
// router.get('/:fight_id/details', async function (req, res) {
//     const fight_id = parseInt(req.params.fight_id);
//     let fight = (await Fight.get_fight(fight_id)).rows[0];
//     let rounds = (await pool.query('SELECT * FROM round WHERE fight_id = $1', [fight_id])).rows;
//     fight.rounds = [];
//     for (let i = 0; i < rounds.length; i++) {
//         fight.rounds.push(rounds[i].round_id);
//     }
//     fight.strikes = [];
//     for (let i = 0; i < fight.rounds.length; i++) {
//         let strikes = (await pool.query('SELECT * FROM relation_strike_round WHERE round_id = $1', [fight.rounds[i]])).rows;
//         fight.strikes.push(strikes);
//     }
//     res.render('fights/detailFightRegistry.ejs', { fight: fight });
// });
module.exports = router;