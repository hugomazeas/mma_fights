class Simulation {
    static time_speed = [1, 0.5, 0.25, 0.1];
    #strikes;
    #running;
    #round_id;
    #org_id;
    #event_id;
    #fight_id;
    #time_speed_factor;
    #fight;
    timer;
    simulation_panel;

    constructor(round_id, org_id, event_id, fight_id) {
        this.#round_id = round_id;
        this.#running = false;
        this.#event_id = event_id;
        this.#org_id = org_id;
        this.#fight_id = fight_id;
        this.#time_speed_factor = 1;
        this.timer = new Timer(300);
        this.timer.set_factor(1);
        this.#strikes = [];
    }
    get strikes() {
        return this.#strikes;
    }
    set strikes(strikes) {
        this.#strikes = strikes;
    }
    get round_id() {
        return this.#round_id;
    }
    get fight() {
        return this.#fight;
    }
    get time_speed_factor() {
        return this.#time_speed_factor;
    }
    set time_speed_factor(time_speed_factor) {
        this.#time_speed_factor = time_speed_factor;
    }
    initialize() {
        this.#strikes = this.get_strike_existing_round(this.#round_id);
    }
    start() {
        this.#strikes = [];
        this.#running = true;
        this.timer.start(50);
    }
    stop() {
        this.timer.stop();
        this.#running = false;
    }
    pause() {
        this.timer.stop();
        this.#running = false;
    }
    reset() {
        this.back_to_start();
        this.#running = false;
        this.#strikes = [];
    }
    rollback_seconds(seconds) {
        this.timer.rollback_seconds(seconds);
        this.timer.update_view();
    }
    forward_seconds(seconds) {
        this.timer.forward_seconds(seconds);
        this.timer.update_view();
    }
    back_to_start() {
        this.timer.reset();
        this.timer.update_view();
    }
    front_to_end() {
        this.timer.finish();
        this.timer.update_view();
    }
    add_strikes(strikes) {
        this.#strikes.push(...strikes);
    }
    get_current_round_time() {
        return to_MM_SS_MS(this.timer.get_elapse_time());
    }
    set_factor(new_factor) {
        this.timer.set_factor(new_factor);
    }
    display_info() {
        let simulation_results = new SimulationResults();
        simulation_results.set_simulation(this);
        simulation_results.display_simulation_results();
    }
    clear() {
        this.#strikes = [];
    }
    is_running() {
        return this.#running;
    }
    get_strike_existing_round(round_id) {
        let strikesDB = AppNavigator.send_ajax_request('/organisations/' + this.#org_id + '/events/' + this.#event_id + '/fights/' + this.#fight_id + '/strikes', 'GET', false, null, function(){});
        let strikes = [];
        strikesDB.forEach(strike => {
            strikes.push(new Strike(strike.striker_id, strike.target_id, strike.strike_code.split('_')[0], strike.strike_code.split('_')[2], strike.sig_strike, strike.fight_status, strike.round_id, strike.round_time_in_s));
        });
        if (round_id != 0) {
            strikes = strikes.filter(strike => strike.round_id == round_id);
        }
        return strikes;
    }
    new_strike(strike) {
        if (strike.fighter_number == 1) {
            strike.striker_id = fight.fighter1.fighter_id;
            strike.target_id = fight.fighter2.fighter_id;
        } else {
            strike.striker_id = fight.fighter2.fighter_id;
            strike.target_id = fight.fighter1.fighter_id;
        }
        strike.sig_strike = strike.sig_strike == "true" ? true : false;
        let final_strike = new Strike(strike.striker_id, strike.target_id, strike.action, strike.target, strike.sig_strike, strike.fight_status, this.#round_id, strike.round_time);
        if (this.#running) {
            this.#strikes.push(final_strike);
        } else {
            console.log('Simulation not running');
        }
        return final_strike;
    }
    get_fighter_total_sig_strikes(fighter_id) {
        let strikes = this.#strikes.filter(strike => strike.striker_id == fighter_id && strike.sig_strike == true);
        return strikes.length;
    }
    get_fighter_total_strike(fighter_id) {
        let strikes = this.#strikes.filter(strike => strike.striker_id == fighter_id);
        return strikes.length;
    }
    get_fighter_accuracy(fighter_id) {
        return Math.round((this.get_fighter_total_sig_strikes(fighter_id) / this.get_fighter_total_strike(fighter_id)) * 100, 2);
    }
    get_fighter_accuracy_by_action(fighter_id, action) {
        let strikes = this.#strikes.filter(strike => strike.striker_id == fighter_id && strike.action == action);
        let sig_strikes = strikes.filter(strike => strike.sig_strike == true);
        return Math.round((sig_strikes.length / strikes.length) * 100, 2);
    }
    get_fighter_hit_target(fighter_id, target) {
        let strikes = this.#strikes.filter(strike => strike.target_id == fighter_id && strike.strike_target == target);
        return strikes.length;
    }
    get_fighter_strike_type(fighter_id, strike_type, sig_strike) {
        let strikes = [];
        if (sig_strike) {
            strikes = this.#strikes.filter(strike => strike.striker_id == fighter_id && strike.action == strike_type && strike.sig_strike == sig_strike);
        } else {
            strikes = this.#strikes.filter(strike => strike.striker_id == fighter_id && strike.action == strike_type);
        }
        return strikes.length;
    }
    get_fighter_takedown_attemps(fighter_id) {
        let strikes = this.#strikes.filter(strike => strike.striker_id == fighter_id && strike.action == "takedown");
        return strikes.length;
    }
    get_fighter_takedown_landed(fighter_id) {
        let strikes = this.#strikes.filter(strike => strike.striker_id == fighter_id && strike.action == "takedown" && strike.sig_strike == true);
        return strikes.length;
    }
    get_fighter_takedown_accuracy(fighter_id) {
        return Math.round((this.get_fighter_takedown_landed(fighter_id) / this.get_fighter_takedown_attemps(fighter_id)) * 100, 2);
    }
    send_simulation() {
        $.ajax({
            type: "POST",
            url: "/simulations/strikes",
            contentType: "application/json",
            cache: false,
            data: JSON.stringify(this.#strikes),
            success: function (response) {
                console.log(response);
            }
        });
    }
}