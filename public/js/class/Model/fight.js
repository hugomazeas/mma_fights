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
    init_simulations() {
        let total_simulation = new Simulation(0, this.org_id, this.event_id, this.fight_id);
        for (let i = 0; i < this.number_of_rounds; i++) {
            let simulation = new Simulation(this.round_ids[i], this.org_id, this.event_id, this.fight_id);
            simulation.initialize();

            total_simulation.add_strikes(simulation.strikes);

            this.simulations.push(simulation);
        }
        this.simulations.push(total_simulation);
        this.fighter1 = AppNavigator.send_ajax_request('/api/fighter/' + this.fighter1_id, 'GET', false, null, function () { });
        this.fighter2 = AppNavigator.send_ajax_request('/api/fighter/' + this.fighter2_id, 'GET', false, null, function () { });

    }
    get_round_simulation(round_id) {
        return this.simulations.find(simulation => simulation.round_id == round_id);
    }
    static build_form() {

        let form = new FormBuilder("Add Fight", "fight_form", [], 50, 50);
        let formEvent = new FormField("events", "event_id", "Event");
        let formFighter1 = new FormField("fighters", "fighter1_id", "Fighter 1");
        let formFighter2 = new FormField("fighters", "fighter2_id", "Fighter 2");
        let formDivision = new FormField("division", "division", "Division");
        let formRoundLength = new FormField("number", "round_length", "Round Length (in seconds, 5 minutes = 300 seconds)");
        let formNumberRound = new FormField("number_round", "number_round", "Number of rounds");
        let formCardType = new FormField("card_type", "card_type", "Card Type");
        let formCardTitle = new FormField("text", "card_title", "Card Title");
        let formCancel = new FormField("cancel_button", "cancel", "Cancel");
        let formSubmit = new FormField("button", "submit", "Submit");

        form.form_fields.push(formEvent);
        form.form_fields.push(formFighter1);
        form.form_fields.push(formFighter2);
        form.form_fields.push(formDivision);
        form.form_fields.push(formRoundLength);
        form.form_fields.push(formNumberRound);
        form.form_fields.push(formCardType);
        form.form_fields.push(formCardTitle);
        form.form_fields.push(formCancel);
        form.form_fields.push(formSubmit);
        return form.build();
    }
    static async show_modal_form() {
        let form = await Fight.build_form();
        let modal = new ModalManager("Add Fight", form, 3);
        modal.show();
    }

}