class Round {
    static #pool = require('../router/db.js');

    static async get_rounds() {
        return (await this.#pool.query('SELECT * FROM round')).rows;
    }
    static async get_round(round_id) {
        return await this.#pool.query(`SELECT * FROM round WHERE round_id = ${round_id};`);
    }
    static async get_rounds_by_fight(fight_id) {
        return await this.#pool.query(`SELECT * FROM round WHERE fight_id = ${fight_id} ORDER BY round_number;`);
    }
    static async add_round(round) {
        const values = [round.round_number, round.fight_id, round.round_length, round.max_duraiton];
        return await this.#pool.query('INSERT INTO round (round_number, fight_id, round_length, max_duration) VALUES ($1, $2, $3, $4)', values);
    }
}
module.exports = Round;