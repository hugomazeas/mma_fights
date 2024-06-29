const Model = require('./model.js');

class Event extends Model {

    static async get_all_events() {
        return (await (Model.pool.query('SELECT * FROM event'))).rows;
    }
    static async get_event(event_id) {
        return (await Model.pool.query(`SELECT * FROM event WHERE event_id = ${event_id};`)).rows[0];
    }
    static async get_events_by_organisation(organisation_id) {
        return (await Model.pool.query(`SELECT * FROM event WHERE organisation_id = ${organisation_id};`)).rows;
    }
    static async add_event(event) {
        const values = [event.name, event.date, event.organisation_id, event?.location, event?.description, event?.photo_url];
        return (await Model.pool.query('INSERT INTO event (name, date, organisation_id, location, description, photo_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', values)).rows[0];
    }
    static async update_event(event_id, event) {
        const values = [event.name, event.date, event.organisation_id, event_id];
        return await Model.pool.query('UPDATE event SET name = $1, date = $2, organisation_id = $3 WHERE event_id = $4 RETURNING *', values);
    }
    static async delete_event(event_id) {
        return await Model.pool.query('DELETE FROM event WHERE event_id = $1', [event_id]);
    }
}
module.exports = Event;