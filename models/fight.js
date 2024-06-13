class Fight {
    static #pool = require('../router/db.js');
    static async get_all_fights() {
        return await this.#pool.query(`
            SELECT 
            fight.fight_id,
            fight.event_id,
            event.name AS event_name,
            event.date AS event_date,
            event.location AS event_location,
            fight.fight_round,
            fight.number_round,
            fight.round_length,
            fight.fight_name,
            division.division AS division_name,
            card_type.name AS card_type_name,
            CONCAT(fighter1.first_name, ' ', fighter1.last_name) AS fighter1_full_name,
            fighter1.wins AS fighter1_wins,
            fighter1.losses AS fighter1_losses,
            fighter1.draws AS fighter1_draws,
            CONCAT(fighter2.first_name, ' ', fighter2.last_name) AS fighter2_full_name,
            fighter2.wins AS fighter2_wins,
            fighter2.losses AS fighter2_losses,
            fighter2.draws AS fighter2_draws,
            CASE 
                WHEN fight.winner_id IS NOT NULL THEN CONCAT(winner.first_name, ' ', winner.last_name)
                ELSE 'No winner yet'
            END AS winner_full_name
            FROM 
                fight
            JOIN 
                event ON fight.event_id = event.event_id
            JOIN 
                fighter AS fighter1 ON fight.fighter1_id = fighter1.fighter_id
            JOIN 
                fighter AS fighter2 ON fight.fighter2_id = fighter2.fighter_id
            LEFT JOIN 
                fighter AS winner ON fight.winner_id = winner.fighter_id
            JOIN 
                division ON CAST(fight.division AS INTEGER) = division.division_id
            JOIN 
                card_type ON CAST(fight.card_type AS INTEGER) = card_type.card_type_id;
            `);
    }
}
module.exports = Fight;