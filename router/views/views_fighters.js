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
router.post('/', async function (req, res) {
    try {
        const fighter = req.body.fighter;
        let result_fighter = await Fighter.add_fighter(fighter);
        res.status(201).send(result_fighter);
    } catch (error) {
        console.error("Error inserting data: ", error);
        res.status(500).send(error.toString());
    }
});
router.put('/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const fighter = req.body.fighter;
        let result_fighter = await Fighter.update_fighter(id, fighter);
        res.status(200).send(result_fighter);
    } catch (error) {
        console.error("Error updating data: ", error);
        res.status(500).send(error.toString());
    }
});
router.delete('/:id', async function (req, res) {
    try {
        const id = req.params.id;
        await Fighter.delete_fighter(id);
        res.status(200).send("Fighter deleted successfully");
    } catch (error) {
        console.error("Error deleting data: ", error);
        res.status(500).send(error.toString());
    }
});
module.exports = router;
