class Fighter {
    static #pool = require('../router/db.js');

    static async get_all_fighters() {
        return (await this.#pool.query('SELECT * FROM fighter')).rows;
    }
    static async get_fighter(fighter_id) {
        return await this.#pool.query(`SELECT * FROM fighter WHERE fighter_id = ${fighter_id};`);
    }
    static async add_fighter(fighter) {
        const values = [fighter.first_name, fighter.last_name, fighter?.nickname, fighter?.height, fighter?.weight, fighter?.reach, fighter?.stance, fighter?.wins, fighter?.losses, fighter?.draws, fighter?.background, fighter?.behavior_targs, fighter?.moves_tags]
        return await this.#pool.query('INSERT INTO fighter (first_name, last_name, nickname, height, weight, reach, stance, wins, losses, draws, background, behavior_tags, moves_tags) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', values);
    }
    static async update_fighter(fighter_id, fighter) {
        const values = [fighter.first_name, fighter.last_name, fighter.nickname, fighter?.height, fighter?.weight, fighter?.reach, fighter?.stance, fighter?.wins, fighter?.losses, fighter?.draws, fighter?.background, fighter?.behavior_tags, fighter?.moves_tags, fighter_id];
        return await this.#pool.query('UPDATE fighter SET first_name = $1, last_name = $2, nickname = $3, height = $4, weight = $5, reach = $6, stance = $7, wins = $8, losses = $9, draws = $10, background = $11, behavior_tags = $12, moves_tags = $13 WHERE fighter_id = $14', values);
    }
    static async delete_fighter(fighter_id) {
        return await this.#pool.query('DELETE FROM fighter WHERE fighter_id = $1', [fighter_id]);
    }
}
module.exports = Fighter;