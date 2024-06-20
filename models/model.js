class Model {
    static #pool = require('../router/db.js');
    static async get_all(model) {
        return (await (this.#pool.query(`SELECT * FROM ${model}`))).rows;
    }
}
module.exports = Model;