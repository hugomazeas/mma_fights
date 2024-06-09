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
        this.fighter1 = Facade.send_ajax_request('/api/fighter/' + this.fighter1_id, 'GET', false, null, function () { });
        this.fighter2 = Facade.send_ajax_request('/api/fighter/' + this.fighter2_id, 'GET', false, null, function () { });

    }

    get_round_simulation(round_id) {
        return this.simulations.find(simulation => simulation.round_id == round_id);
    }
    static build_form() {

        let form = new FormBuilder("Add Fight", "fight_form", [], 50, 50);
        let formEvent = new FormField("event", "event_id", "Event");
        let formFighter1 = new FormField("fighter", "fighter1_id", "Blue Fighter");
        let formFighter2 = new FormField("fighter", "fighter2_id", "Red Fighter");
        let formDivision = new FormField("division", "division", "Division");
        let formRoundLength = new FormField("round_length", "round_length", "Round Length (in minutes)");
        let formNumberRound = new FormField("number_round", "number_round", "Number of rounds");
        let formCardType = new FormField("card_type", "card_type", "Card Type");
        let formCancel = new FormField("cancel_button", "cancel", "Cancel");
        let formSubmit = new FormField("button", "submit", "Submit", "", "", "", "", "Fight.submit_form()");

        form.form_fields.push(formEvent);
        form.form_fields.push(formFighter1);
        form.form_fields.push(formFighter2);
        form.form_fields.push(formDivision);
        form.form_fields.push(formRoundLength);
        form.form_fields.push(formNumberRound);
        form.form_fields.push(formCardType);
        form.form_fields.push(formCancel);
        form.form_fields.push(formSubmit);
        return form.build();
    }
    static show_modal_form() {
        let form = Fight.build_form();
        let modal = new Modal("Add Fight", form, 3);
        modal.show();
    }
    static async submit_form() {
        let fight = {
            event_id: $("[name='event_id']").val(),
            fighter1_id: $("[name='fighter1_id']").val(),
            fighter2_id: $("[name='fighter2_id']").val(),
            division: $("[name='division']").val(),
            round_length: $("[name='round_length']").val(),
            number_round: $("[name='number_round']").val(),
            card_type: $("[name='card_type']").val(),
        }
        Facade.send_ajax_request('/api/fight', 'POST', true, fight, function () { Modal.close(); Facade.refresh_page();});
        return fight;
    }
    static async delete_fight(fight_id) {
        if (confirm("Are you sure you want to delete this fight?") === false) return;
        Facade.send_ajax_request('/api/fight/' + fight_id, 'DELETE', true, null, function () { Facade.refresh_page(); });
    }
}