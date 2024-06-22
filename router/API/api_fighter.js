const express = require('express');
const router = express.Router({ mergeParams: true });
const Fighter = require('../../models/fighter');

router.get('/:fighter_id', async function (req, res) {
    const fighter_id = req.params.fighter_id;
    const fighter = (await Fighter.get_fighter(fighter_id)).rows;
    if (fighter.length === 0) {
        return res.status(404).send('Fighter not found');
    }
    res.status(200).send(fighter[0]);
});

router.get('/', async function (req, res) {
    const fighters = (await Fighter.get_all_fighters());
    res.status(200).send(fighters);
});

router.post("/", async function (req, res) {
    const fighter = req.body;
    const result = (await Fighter.add_fighter(fighter));
    // Does not return fighter object with id...
    res.status(201).send(result);
});

router.delete('/:fighter_id', async function (req, res) {
    const fighter_id = parseInt(req.params.fighter_id);
    (await Fighter.delete_fighter(fighter_id));
    res.status(204).send();
});
module.exports = router;