
class Strike {
    static actions = ['punch', 'knee', 'elbow', 'kick', 'takedown', 'other'];
    static targets = ['head', 'body', 'leg', 'takedown', 'other'];
    static fight_status = ['standing', 'clinch', 'ground', 'other'];

    #action;
    #target;
    #stricker_id;
    #target_id;
    #strike_code;
    #sig_strike;
    #fight_status;
    #round_id;
    constructor(striker_id, target_id, action, target, sig_strike, fight_status, round_id) {
        this.#stricker_id = striker_id;
        this.#target_id = target_id;
        this.#action = action;
        this.#target = target;
        this.#sig_strike = sig_strike;
        this.#fight_status = fight_status;
        this.#round_id = round_id;

        if (!Strike.actions.includes(this.#action)) {
            throw new Error('Invalid action');
        }
        if (!Strike.targets.includes(this.#target)) {
            throw new Error('Invalid target');
        }
        if (!Strike.fight_status.includes(this.#fight_status)) {
            throw new Error('Invalid fight status');
        }
        if (this.#action == 'takedown') {
            this.#strike_code = this.#action.toUpperCase();
            return;
        }
        else {
            this.#strike_code = this.#action.toUpperCase() + '_TO_' + this.#target.toUpperCase();
        }
    }
    getJSON() {
        console.log(JSON.stringify(this));
        return JSON.stringify(this);
    }
}