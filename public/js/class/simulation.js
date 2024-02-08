
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
    new_strike(striker, action, target, sig_strike, fight_status) {
        let striker_id;
        let target_id;
        if (striker == 1) {
            striker_id = this.#fighter1_id;
            target_id = this.#fighter2_id;
        } else {
            striker_id = this.#fighter2_id;
            target_id = this.#fighter1_id;
        }
        let strike = new Strike(striker_id, target_id, action, target, sig_strike, fight_status, this.#round_id);
        if (this.#running) {
            this.#strikes.push(strike);
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