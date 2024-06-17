class Fight {
    static #pool = require('../router/db.js');
    static async get_all_fights() {
        return await this.#pool.query(`
            SELECT 
            f.fight_id,
            f.fight_round,
            f.number_round,
            f.round_length,
            f.ufc_number,
            e.name as event_name,
            d.division,
            ct.name as card_type_name,
            CONCAT(f1.first_name, ' ', f1.last_name) as fighter1_full_name,
            CONCAT(f2.first_name, ' ', f2.last_name) as fighter2_full_name,
            CONCAT(fw.first_name, ' ', fw.last_name) as winner_full_name
            FROM fight f
            LEFT JOIN event e ON f.event_id = e.event_id
            LEFT JOIN division d ON f.division = d.division_id
            LEFT JOIN card_type ct ON f.card_type = ct.card_type_id
            LEFT JOIN fighter f1 ON f.fighter1_id = f1.fighter_id
            LEFT JOIN fighter f2 ON f.fighter2_id = f2.fighter_id
            LEFT JOIN fighter fw ON f.winner_id = fw.fighter_id;
            `);
    }
    static async get_fight(fight_id) {
        return await this.#pool.query(`
            SELECT 
            f.fight_id,
            f.fight_round,
            f.number_round,
            f.round_length,
            f.ufc_number,
            e.name as event_name,
            d.division,
            ct.name as card_type_name,
            CONCAT(f1.first_name, ' ', f1.last_name) as fighter1_full_name,
            CONCAT(f2.first_name, ' ', f2.last_name) as fighter2_full_name,
            CONCAT(fw.first_name, ' ', fw.last_name) as winner_full_name
            FROM fight f
            LEFT JOIN event e ON f.event_id = e.event_id
            LEFT JOIN division d ON f.division = d.division_id
            LEFT JOIN card_type ct ON f.card_type = ct.card_type_id
            LEFT JOIN fighter f1 ON f.fighter1_id = f1.fighter_id
            LEFT JOIN fighter f2 ON f.fighter2_id = f2.fighter_id
            LEFT JOIN fighter fw ON f.winner_id = fw.fighter_id
            WHERE f.fight_id = ${fight_id};`);
    }

}
module.exports = Fight;