const Round = require('./round.js');

class Strike {
    static #pool = require('../router/db.js');
    static async get_strikes_by_round(round_id) {
        return (await this.#pool.query('SELECT * FROM relation_strike_round WHERE round_id = $1', [round_id])).rows;
    }
    static async get_strikes_by_fight_id(fight_id) {
        let rounds = Round.get_rounds_by_fight(fight_id);
        let strikes = [];
        for (let i = 0; i < rounds.length; i++) {
            strikes.push((await this.get_strikes_by_round(rounds[i].round_id)).rows);
        }
        return strikes;
    }
}
module.exports = Strike;