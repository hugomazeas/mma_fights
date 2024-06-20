class Event {
    static #pool = require('../router/db.js');

    static async get_all_events() {
        return (await (this.#pool.query('SELECT * FROM event'))).rows;
    }
    static async get_event(event_id) {
        return (await this.#pool.query(`SELECT * FROM event WHERE event_id = ${event_id};`)).rows[0];
    }
    static async get_events_by_organisation(organisation_id) {
        return (await this.#pool.query(`SELECT * FROM event WHERE organisation_id = ${organisation_id};`)).rows;
    }
    static async add_event(event) {
        const values = [event.name, event.date, event.organisation_id];
        return await this.#pool.query('INSERT INTO event (name, date, organisation_id) VALUES ($1, $2, $3)', values);
    }
    static async update_event(event_id, event) {
        const values = [event.name, event.date, event.organisation_id, event_id];
        return await this.#pool.query('UPDATE event SET name = $1, date = $2, organisation_id = $3 WHERE event_id = $4', values);
    }
    static async delete_event(event_id) {
        return await this.#pool.query('DELETE FROM event WHERE event_id = $1', [event_id]);
    }

}
module.exports = Event;