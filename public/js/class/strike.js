
class Strike {
    static actions = ['punch', 'knee', 'elbow', 'kick', 'takedown', 'other'];
    static targets = ['head', 'body', 'leg', 'takedown', 'other'];
    static fight_status = ['standing', 'clinch', 'ground', 'other'];

    constructor(striker_id, target_id, action, strike_target, sig_strike, fight_status, round_id, round_time) {
        this.striker_id = striker_id;
        this.round_time = round_time;
        this.target_id = target_id;
        this.action = action.toLowerCase();
        this.sig_strike = sig_strike;
        this.fight_status = fight_status;
        this.round_id = round_id;
        if (!Strike.actions.map(a => a.toLowerCase()).includes(this.action.toLowerCase())) {
            throw new Error('Invalid action');
        }
        if (this.action != 'takedown') {
            this.strike_target = strike_target.toLowerCase();
            if (!Strike.targets.map(t => t.toLowerCase()).includes(this.strike_target.toLowerCase())) {
                throw new Error('Invalid target');
            }
        }
        if (!Strike.fight_status.map(fs => fs.toLowerCase()).includes(this.fight_status.toLowerCase())) {
            throw new Error('Invalid fight status');
        }
        if (this.action == 'takedown') {
            this.strike_code = this.action.toUpperCase();
            return;
        }
        else {
            this.strike_code = this.action.toUpperCase() + '_TO_' + this.strike_target.toUpperCase();
        }
        if(this.round_time == null || this.round_time < 0 || this.round_time > 300000){
            throw new Error('Invalid round time');
        }
    }
}