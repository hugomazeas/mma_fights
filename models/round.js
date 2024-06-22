const Model = require('./model.js');

class Round extends Model{

    static async get_rounds() {
        return (await Model.pool.query('SELECT * FROM round')).rows;
    }
    static async get_round(round_id) {
        return await Model.pool.query(`SELECT * FROM round WHERE round_id = ${round_id};`);
    }
    static async get_rounds_by_fight(fight_id) {
        return (await Model.pool.query(`SELECT * FROM round WHERE fight_id = ${fight_id} ORDER BY round_number;`)).rows;
    }
    static async add_round(round) {
        const values = [round.round_number, round.fight_id, round.round_length, round.max_duration];
        return await Model.pool.query('INSERT INTO round (round_number, fight_id, round_duration, max_duration) VALUES ($1, $2, $3, $4)', values);
    }
    static async delete_round(round_id) {
        return await Model.pool.query('DELETE FROM round WHERE round_id = $1', [round_id]);
    }
    static async delete_rounds_by_fight(fight_id) {
        return await Model.pool.query('DELETE FROM round WHERE fight_id = $1', [fight_id]);
    }
}
module.exports = Round;