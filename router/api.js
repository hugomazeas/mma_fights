const express = require('express');
const router = express.Router({ mergeParams: true });
const pool = require('./db');

const Navbar = require('../models/navbar.js');

const organisationRouter = require('./API/api_organisation');
const eventRouter = require('./API/api_event');
const fighterRouter = require('./API/api_fighter');
const fightRouter = require('./API/api_fight');

router.use('/organisation', organisationRouter);
router.use('/fight', fightRouter);
router.use('/event', eventRouter);
router.use('/fighter', fighterRouter);

router.get('/columnInfo/:table_name/', async function (req, res) {
    const table_name = req.params.table_name;
    const columns = (await pool.query("SELECT * FROM get_column_comments('" + table_name + "');"));
    res.send(columns.rows);
});
router.get('/navbar_item', async function (req, res) {
    let navbar = new Navbar();
    let db_navbar = (await pool.query('SELECT * FROM navbar')).rows;
    db_navbar.forEach(element => {
        navbar.addItem(element.name, element.onClickCallback, element.icon);
    });
    res.render('partials/navBar', { navbar: navbar.getItems() });
});
router.get('/division', async function (req, res) {
    const divisions = (await pool.query('SELECT * FROM division')).rows;
    res.send(divisions);
});
router.get('/number_round', async function (req, res) {
    const number_rounds = (await pool.query('SELECT * FROM number_round')).rows;
    res.send(number_rounds);
});
router.get('/card_type', async function (req, res) {
    const card_types = (await pool.query('SELECT * FROM card_type')).rows;
    res.send(card_types);
});
router.get('/round_length', async function (req, res) {
    const round_lengths = (await pool.query('SELECT * FROM round_length')).rows;
    res.send(round_lengths);
});
router.get('/fighter_form', async function (req, res) {
    res.render('partials/fighter_form');
});
module.exports = router;
