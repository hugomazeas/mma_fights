class Fight {
    static #pool = require('../router/db.js');
    static async get_fights_by_event(event_id) {
        return (await Fight.get_all_fights()).filter(fight => fight.event_id == event_id);
    }
    static async get_all_fights() {
        return (await this.#pool.query(`
            SELECT 
            f.event_id,
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
            `)).rows;
    }
    static async get_fight(fight_id) {
        const fights = await Fight.get_all_fights();
        return fights.filter(fight => fight.fight_id == fight_id);
    }
    static async add_fight(fight) {
        const values = [fight.fight_round, fight.number_round, fight.round_length, fight.ufc_number, fight.event_id, fight.division, fight.card_type, fight.fighter1_id, fight.fighter2_id, fight.winner_id];
        return await this.#pool.query('INSERT INTO fight (fight_round, number_round, round_length, ufc_number, event_id, division, card_type, fighter1_id, fighter2_id, winner_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', values);
    }
    static async update_fight(fight_id, fight) {
        const values = [fight.fight_round, fight.number_round, fight.round_length, fight.ufc_number, fight.event_id, fight.division, fight.card_type, fight.fighter1_id, fight.fighter2_id, fight.winner_id, fight_id];
        return await this.#pool.query('UPDATE fight SET fight_round = $1, number_round = $2, round_length = $3, ufc_number = $4, event_id = $5, division = $6, card_type = $7, fighter1_id = $8, fighter2_id = $9, winner_id = $10 WHERE fight_id = $11', values);
    }
    static async delete_fight(fight_id) {
        return await this.#pool.query('DELETE FROM fight WHERE fight_id = $1', [fight_id]);
    }
}
module.exports = Fight;