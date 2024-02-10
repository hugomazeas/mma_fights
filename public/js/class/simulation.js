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
    get strikes() {
        return this.#strikes;
    }
    start() {
        this.#running = true;
    }
    stop() {
        this.#running = false;
    }
    isRunning() {
        return this.#running;
    }
    new_strike(strike) {
        if (strike.striker == 1) {
            strike.striker_id = this.#fighter1_id;
            strike.target_id = this.#fighter2_id;
        } else {
            strike.striker_id = this.#fighter2_id;
            strike.target_id = this.#fighter1_id;
        }
        let final_strike = new Strike(strike.striker_id, strike.target_id, strike.action, strike.target, strike.sig_strike, strike.fight_status, this.#round_id);
        if (this.#running) {
            this.#strikes.push(final_strike);
        } else {
            console.log('Simulation not running');
        }
    }
    getJSON() {
        if (!this.#running) {
            let json = '';
            this.#strikes.forEach((strike) => {
                json.push(strike.getJSON());
            });
            console.log(json);
            return json;
        } else {
            console.log('Simulation still running');
        }
    }
}