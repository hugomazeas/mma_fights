class Fight {
    fight_id;
    event_id;
    fighter1_id;
    fighter2_id;
    winner_id;
    division;
    round_length;
    card_type;
    card_title;
    simulations = [];
    constructor(fight_id, event_id, fighter1_id, fighter2_id, winner_id, division, round_length, card_type, card_title, rounds_ids, ufc_number, number_of_rounds) {
        const checkField = (field, fieldName) => {
            if (field === null || field === "") {
                throw new Error(`The field ${fieldName} must be filled`);
            }
        };
        checkField(fighter1_id, "Blue Fighter");
        checkField(fighter2_id, "Red Fighter");
        checkField(winner_id, "Winner ID");
        checkField(division, "Division");
        checkField(round_length, "Round Length");
        checkField(card_type, "Card Type");
        this.fight_id = fight_id;
        this.event_id = event_id;
        this.fighter1_id = fighter1_id;
        this.fighter2_id = fighter2_id;
        this.winner_id = winner_id;
        this.division = division;
        if (typeof number_of_rounds === 'string') {
            number_of_rounds = parseInt(number_of_rounds);
        }
            
        this.number_rounds = number_of_rounds;
        this.round_ids = rounds_ids;
        this.round_length = round_length;
        this.card_type = card_type;
        this.card_title = "";
        this.ufc_number = ufc_number;
    }
    init_simulations() {
        let total_simulation = new Simulation(0, this.fight_id);
        for (let i = 0; i < this.number_rounds; i++) {
            let simulation = new Simulation(this.fight_id, this.round_ids[i]);
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
        let formWinner = new FormField("select", "winner_id", "Winner",);
        let formRoundLength = new FormField("round_length", "round_length", "Round Length (in minutes)");
        let formNumberRound = new FormField("number_round", "number_round", "Number of rounds");
        let formCardType = new FormField("card_type", "card_type", "Card Type");
        let formUFCNumber = new FormField("number", "ufc_number", "UFC Number");
        let formCancel = new FormField("cancel_button", "cancel", "Cancel");
        let formSubmit = new FormField("button", "submit", "Submit", "", "", "", "", "Fight.submit_form()");

        form.form_fields.push(formEvent);
        form.form_fields.push(formFighter1);
        form.form_fields.push(formFighter2);
        form.form_fields.push(formDivision);
        form.form_fields.push(formUFCNumber);
        form.form_fields.push(formWinner);
        form.form_fields.push(formNumberRound);
        form.form_fields.push(formRoundLength);
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
        let fight;
        try {
            fight = new Fight(
                null,
                $("[name='event_id']").val() ? $("[name='event_id']").val() : null,
                $("[name='fighter1_id']").val() ? $("[name='fighter1_id']").val() : null,
                $("[name='fighter2_id']").val() ? $("[name='fighter2_id']").val() : null,
                $("[name='winner_id']").val() ? $("[name='winner_id']").val() : null,
                $("[name='division']").val() ? $("[name='division']").val() : null,
                $("[name='round_length']").val() ? $("[name='round_length']").val() : null,
                $("[name='card_type']").val() ? $("[name='card_type']").val() : null,
                null,
                [],
                $("[name='ufc_number']").val() ? $("[name='ufc_number']").val() : null,
                $("[name='number_round']").val() ? $("[name='number_round']").val() : null
            );
        } catch (error) {
            alert(error);
            return;
        }
        Facade.send_ajax_request('/api/fight', 'POST', true, fight, function () {
            Modal.close();
            Facade.refresh_page();
            Notification.success("Fight added successfully");
        });
    }
    static async delete_fight(fight_id) {
        if (confirm("Are you sure you want to delete this fight?") === false) return;
        Facade.send_ajax_request('/api/fight/' + fight_id, 'DELETE', true, null, function () {
            Notification.success("Fight deleted successfully");
        });
    }
    static async show_fight_details(fight_id) {
        let fight = Facade.send_ajax_request('/api/fight/' + fight_id + '/details', 'GET', false, null, function () { });
        let modal = new Modal("Fight Details", fight, 3);
        modal.show();
    }
}