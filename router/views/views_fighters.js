const express = require('express');
const router = express.Router({ mergeParams: true }); 
const { handleResponse } = require('../utility');
const Fighter = require('../../models/fighter');
const Model = require('../../models/model');

router.get('/', async function (req, res) {
    const fighter = await Fighter.get_all_fighters();
    const backgrounds = await Model.get_all('background_tags');
    const behaviors = await Model.get_all('behavior_tags');
    const moves = await Model.get_all('moves');
    handleResponse('fighters/fighters', req, res, { fighters: fighter, backgrounds: backgrounds, behaviors: behaviors, moves: moves});
});
router.get('/:fighter_id', async function (req, res) {
    const id = req.params.fighter_id;
    let fighter = await Fighter.get_fighter(id);
    res.send("Not implemented yet");
    handleResponse('fighters/detailFighter', req, res, { fighter: fighter[0] });
});
module.exports = router;
