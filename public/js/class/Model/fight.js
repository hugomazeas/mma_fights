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
    constructor(fight_id, event_id, fighter1_id, fighter2_id, winner_id, division, round_length, card_type, card_title, rounds_ids, ufc_number, number_of_rounds, win_type) {
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

        this.number_round = number_of_rounds;
        this.round_ids = rounds_ids;
        this.round_length = round_length;
        this.card_type = card_type;
        this.card_title = "";
        this.ufc_number = ufc_number;
        this.win_type = win_type;
    }
    init_simulations() {
        let total_simulation = new Simulation(this.fight_id, 0);
        for (let i = 0; i < this.number_round; i++) {
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
    static build_form(fight) {
        const action = fight ? 'Edit' : 'Add';
        let winner_options = [];
        if (fight) {
            this.fighter1_full_name = Facade.send_ajax_request('/api/fighter/' + fight.fighter1_id, 'GET', false, null, function () { }).full_name;
            this.fighter2_full_name = Facade.send_ajax_request('/api/fighter/' + fight.fighter2_id, 'GET', false, null, function () { }).full_name;
            winner_options = [{ fighter_id: fight.fighter1_id, fighter_name: this.fighter1_full_name }, { fighter_id: fight.fighter2_id, fighter_name: this.fighter2_full_name }];
        }
        const fields = [
            new FormField("event", "event_id", "Event", fight ? fight.event_id : ''),
            new FormField("fighter", "fighter1_id", "Blue Fighter", fight ? fight.fighter1_id : ''),
            new FormField("fighter", "fighter2_id", "Red Fighter", fight ? fight.fighter2_id : ''),
            new FormField("winner_select", "winner_id", "Winner", fight ? fight.winner_id : '', winner_options),
            new FormField("division", "division", "Division", fight ? fight.division : ''),
            new FormField("win_type", "win_type", "Win Type", fight ? fight.win_type : ''),
            new FormField("round_length", "round_length", "Round Length", fight ? fight.round_length : ''),
            new FormField("card_type", "card_type", "Card Type", fight ? fight.card_type : ''),
            new FormField("number", "ufc_number", "UFC Number", fight ? fight.ufc_number : ''),
            new FormField("number_round", "number_round", "Number of Rounds", fight ? fight.number_round : '')
        ];
        const form = new FormBuilder(`${action} Fight`, "fight_form", fields);
        return form.build();
    }
    static show_modal_create_form() {
        let form = Fight.build_form();
        let modal = new Modal();
        let callback = async function () {
            await Fight.submit_create_form();
            Modal.close();
            Facade.refresh_page();
        };
        modal.add_title("Add Fight").
            add_content(form).
            add_submit_button("Submit", callback).
            add_close_button("Close").
            show();
        // update_winner_options();

        $('select[name="fighter1_id"], select[name="fighter2_id"]').change(function () {
            update_winner_options();
        });
    }
    static show_modal_edit_form() {
        let fight = CookieManager.decode_cookie(CookieManager.get_cookie('fight'));
        let form = Fight.build_form(fight);
        let modal = new Modal();
        let callback = async function () {
            await Fight.submit_edit_form();
            Modal.close();
            Modal.close();
            Fight.show_fight_details(fight.fight_id);
            Facade.refresh_page();
        }
        modal.add_title("Edit Fight").
            add_content(form).
            add_submit_button("Submit", callback).
            add_close_button("Close").
            show();
        // update_winner_options();

        $('select[name="fighter1_id"], select[name="fighter2_id"]').change(function () {
            update_winner_options();
        });
    }
    static async submit_edit_form() {
        let fight = Fight.fetch_form_data();
        let fight_id = CookieManager.decode_cookie(CookieManager.get_cookie('fight')).fight_id;
        Facade.send_ajax_request('/api/fight/' + fight_id, 'PUT', true, fight, function () {
            Modal.close();
            Notification.success("Fight edited successfully");
        });
    }
    static async submit_create_form() {
        let fight = Fight.fetch_form_data();
        Facade.send_ajax_request('/api/fight', 'POST', true, fight, function () {
            Modal.close();
            Notification.success("Fight added successfully");
        });
    }
    static fetch_form_data() {
        let fight = {
            event_id: $("[name='event_id']").val(),
            fighter1_id: $("[name='fighter1_id']").val(),
            fighter2_id: $("[name='fighter2_id']").val(),
            winner_id: $("[name='winner_id']").val(),
            division: $("[name='division']").val(),
            round_length: $("[name='round_length']").val(),
            card_type: $("[name='card_type']").val(),
            ufc_number: $("[name='ufc_number']").val(),
            number_round: $("[name='number_round']").val(),
            win_type: $("[name='win_type']").val()
        };
        return fight;
    }
    static async delete(fight_id) {
        if (confirm("Are you sure you want to delete this fight?") === false) return;
        Facade.send_ajax_request('/api/fight/' + fight_id, 'DELETE', true, null, function () {
            Notification.success("Fight deleted successfully");
        });
    }
    static async show_fight_details(fight_id) {
        Facade.send_ajax_request(`/views/fights/${fight_id}/details`, 'GET', false, null, function (response) {
            const fight = response.target.response;
            CookieManager.set_cookie('fight', { fight_id: fight_id })
            let modal = new Modal();
            modal.
                add_content(fight).
                add_close_button("Close").
                add_supporting_button("Edit", function () { Fight.show_modal_edit_form() }).
                add_supporting_button("Delete", function () {
                    Fight.delete(fight_id);
                    Modal.close();
                    Facade.refresh_page();
                }).
                show();
        });
        Facade.send_ajax_request(`/api/fight/${fight_id}`, 'GET', false, null, function (response) {
            const fight = JSON.parse(response.target.response);
            CookieManager.set_cookie('fight', JSON.stringify(fight));
        });
    }
}