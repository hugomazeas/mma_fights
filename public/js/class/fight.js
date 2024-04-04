class Fight {
    fight_id;
    event_id;
    org_id;
    fighter1_id;
    fighter2_id;
    winner_id;
    division;
    number_of_rounds;
    round_length;
    card_type;
    card_title;
    simulations = [];
    constructor(fight_id, event_id, org_id, fighter1_id, fighter2_id, winner_id, division, round_length, card_type, card_title, rounds_ids) {
        this.fight_id = fight_id;
        this.event_id = event_id;
        this.org_id = org_id;
        this.fighter1_id = fighter1_id;
        this.fighter2_id = fighter2_id;
        this.winner_id = winner_id;
        this.division = division;
        this.number_of_rounds = rounds_ids.length;
        this.round_ids = rounds_ids;
        this.round_length = round_length;
        this.card_type = card_type;
        this.card_title = card_title;
    }
    async init_simulations() {
        let total_simulation = new Simulation(0, this.org_id, this.event_id, this.fight_id);
        for (let i = 0; i < this.number_of_rounds; i++) {
            let simulation = new Simulation(this.round_ids[i], this.org_id, this.event_id, this.fight_id);
            await simulation.initialize();

            total_simulation.add_strikes(simulation.strikes);
            
            this.simulations.push(simulation);
        }
        this.simulations.push(total_simulation);
    }
    get_round_simulation(round_id) {
        return this.simulations.find(simulation => simulation.round_id == round_id);
    }
}