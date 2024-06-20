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
    const id = req.params.fight_id;

    let fight = await Fight.get_fight(id);
    fight.rounds = await Round.get_rounds_by_fight(id);
    handleResponse('fights/detailFight', req, res, { fight: fight[0] });
});
router.post('/', async function (req, res) {
    try {
        const fight = req.body.fight;
        let result_fight = await Fight.add_fight(fight);
        res.status(201).send(result_fight);
    } catch (error) {
        console.error("Error inserting data: ", error);
        res.status(500).send(error.toString());
    }
});
router.put('/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const fight = req.body.fight;
        let result_fight = await Fight.update_fight(id, fight);
        res.status(200).send(result_fight);
    } catch (error) {
        console.error("Error updating data: ", error);
        res.status(500).send(error.toString());
    }
});
router.delete('/:id', async function (req, res) {
    try {
        const id = req.params.id;
        await Fight.delete_fight(id);
        res.status(200).send("Fight deleted successfully");
    } catch (error) {
        console.error("Error deleting data: ", error);
        res.status(500).send(error.toString());
    }
});
module.exports = router;
