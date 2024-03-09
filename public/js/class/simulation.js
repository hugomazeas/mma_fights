class Simulation {
    #strikes = [];
    #running;
    #fighter1_id;
    #fighter2_id;
    #round_id;
    constructor(fighter1_id, fighter2_id, round_id) {
        this.#fighter1_id = fighter1_id;
        this.#fighter2_id = fighter2_id;
        this.#round_id = round_id;
        this.#running = false;
    }
    get fighter1_id() {
        return this.#fighter1_id;
    }
    get fighter2_id() {
        return this.#fighter2_id;
    }
    get strikes() {
        return this.#strikes;
    }
    get round_id() {
        return this.#round_id;
    }
    start() {
        this.#strikes = [];
        this.#running = true;
    }
    stop() {
        display_simulation_results();
        this.#running = false;
    }
    pause() {
        this.#running = false;
    }
    clear(){
        this.#strikes = [];
    }
    is_running() {
        return this.#running;
    }
    new_strike(strike) {
        if (strike.fighter_number == 1) {
            strike.striker_id = this.#fighter1_id;
            strike.target_id = this.#fighter2_id;
        } else {
            strike.striker_id = this.#fighter2_id;
            strike.target_id = this.#fighter1_id;
        }
        strike.sig_strike = strike.sig_strike == "true" ? true : false;
        let final_strike = new Strike(strike.striker_id, strike.target_id, strike.action, strike.target, strike.sig_strike, strike.fight_status, this.#round_id);
        if (this.#running) {
            this.#strikes.push(final_strike);
        } else {
            console.log('Simulation not running');
        }
    }
    getJSON() {
        if (!this.#running) {
            return JSON.stringify(this.#strikes);
        } else {
            console.log('Simulation still running');
        }
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
        let strikes = this.#strikes.filter(strike => strike.target_id == fighter_id && strike.target == target);
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
        let strikes = this.getJSON();
        $.ajax({
            type: "POST",
            url: "/simulation",
            data: { "strikes": strikes },
            success: function (response) {
                console.log(response);
            }
        });
    }
}