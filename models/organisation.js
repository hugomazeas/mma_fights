const Model = require('./model.js');

class Organisation extends Model{

    static async get_all_organisations() {
        return (await Model.pool.query('SELECT * FROM organisation')).rows;
    }
    static async get_organisation(organisation_id) {
        return (await Model.pool.query(`SELECT * FROM organisation WHERE organisation_id = ${organisation_id};`)).rows[0];
    }
    static async add_organisation(organisation) {
        const values = [organisation.name, organisation.headquarter, organisation.founded_year];
        return await Model.pool.query('INSERT INTO organisation (name, headquarter, founded_year) VALUES ($1, $2, $3)', values);
    }
    static async update_organisation(organisation_id, organisation) {
        const values = [organisation.name, organisation.headquarters, organisation.foundedYear, organisation_id];
        return await Model.pool.query('UPDATE organisation SET name = $1, headquarters = $2, founded_year = $3 WHERE organisation_id = $4', values);
    }
    static async delete_organisation(organisation_id) {
        return await Model.pool.query('DELETE FROM organisation WHERE organisation_id = $1', [organisation_id]);
    }
}
module.exports = Organisation;