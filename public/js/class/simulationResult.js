class SimulationResults {
    #TKO;
    #time_out_time;
    constructor(){

    }
    set_simulation(simulation){
        this.simulation = simulation;
    }
    display_simulation_results(){
        
        let round_seconds = this.simulation.timer.get_elapse_time()/1000;
        $(".simulation_round_time").text(format_seconds(round_seconds));
    
        $("#simulation_resume_modal").removeClass("hidden");
        $("#resume_round_number").text(this.simulation.round_id); // bad
        $("#resume_total_strikes").text(this.simulation.strikes.length); 
        $("#fighter1_resume_hits_head").text(this.simulation.get_fighter_hit_target(fight.fighter1.fighter_id, "head") || 0);
        $("#fighter1_resume_hits_body").text(this.simulation.get_fighter_hit_target(fight.fighter1.fighter_id, "body") || 0);
        $("#fighter1_resume_hits_leg").text(this.simulation.get_fighter_hit_target(fight.fighter1.fighter_id, "leg") || 0);
        $("#fighter1_resume_hits_takedown").text(this.simulation.get_fighter_hit_target(fight.fighter1.fighter_id, "takedown") || 0);
        $("#fighter1_resume_strikes_elbow_accuracy").text(this.simulation.get_fighter_accuracy_by_action(fight.fighter1.fighter_id, "elbow") || 0);
        $("#fighter1_resume_strikes_punch_accuracy").text(this.simulation.get_fighter_accuracy_by_action(fight.fighter1.fighter_id, "punch") || 0);
        $("#fighter1_resume_strikes_knee_accuracy").text(this.simulation.get_fighter_accuracy_by_action(fight.fighter1.fighter_id, "knee") || 0);
        $("#fighter1_resume_strikes_kick_accuracy").text(this.simulation.get_fighter_accuracy_by_action(fight.fighter1.fighter_id, "kick") || 0);
        $("#fighter1_resume_strikes_elbow").text(this.simulation.get_fighter_strike_type(fight.fighter1.fighter_id, "elbow") || 0);
        $("#fighter1_resume_strikes_punch").text(this.simulation.get_fighter_strike_type(fight.fighter1.fighter_id, "punch") || 0);
        $("#fighter1_resume_strikes_knee").text(this.simulation.get_fighter_strike_type(fight.fighter1.fighter_id, "knee") || 0);
        $("#fighter1_resume_strikes_kick").text(this.simulation.get_fighter_strike_type(fight.fighter1.fighter_id, "kick") || 0);
        $("#fighter1_resume_strikes_accuracy").text(this.simulation.get_fighter_accuracy(fight.fighter1.fighter_id) || 0);
        $("#fighter1_resume_takedown_accuracy").text(this.simulation.get_fighter_takedown_accuracy(fight.fighter1.fighter_id) || 0);
    
        $("#fighter2_resume_hits_head").text(this.simulation.get_fighter_hit_target(fight.fighter2.fighter_id, "head") || 0);
        $("#fighter2_resume_hits_body").text(this.simulation.get_fighter_hit_target(fight.fighter2.fighter_id, "body") || 0);
        $("#fighter2_resume_hits_leg").text(this.simulation.get_fighter_hit_target(fight.fighter2.fighter_id, "leg") || 0);
        $("#fighter2_resume_hits_takedown").text(this.simulation.get_fighter_hit_target(fight.fighter2.fighter_id, "takedown") || 0);
        $("#fighter2_resume_strikes_elbow_accuracy").text(this.simulation.get_fighter_accuracy_by_action(fight.fighter2.fighter_id, "elbow") || 0);
        $("#fighter2_resume_strikes_punch_accuracy").text(this.simulation.get_fighter_accuracy_by_action(fight.fighter2.fighter_id, "punch") || 0);
        $("#fighter2_resume_strikes_knee_accuracy").text(this.simulation.get_fighter_accuracy_by_action(fight.fighter2.fighter_id, "knee") || 0);
        $("#fighter2_resume_strikes_kick_accuracy").text(this.simulation.get_fighter_accuracy_by_action(fight.fighter2.fighter_id, "kick") || 0);
        $("#fighter2_resume_strikes_elbow").text(this.simulation.get_fighter_strike_type(fight.fighter2.fighter_id, "elbow") || 0);
        $("#fighter2_resume_strikes_punch").text(this.simulation.get_fighter_strike_type(fight.fighter2.fighter_id, "punch") || 0);
        $("#fighter2_resume_strikes_knee").text(this.simulation.get_fighter_strike_type(fight.fighter2.fighter_id, "knee") || 0);
        $("#fighter2_resume_strikes_kick").text(this.simulation.get_fighter_strike_type(fight.fighter2.fighter_id, "kick") || 0);
        $("#fighter2_resume_strikes_accuracy").text(this.simulation.get_fighter_accuracy(fight.fighter2.fighter_id) || 0);
        $("#fighter2_resume_takedown_accuracy").text(this.simulation.get_fighter_takedown_accuracy(fight.fighter2.fighter_id) || 0);
    
    }

    static display_time_exceeding_round_maximum_time() {
        $(".time_less_than_round_maximum_time").addClass("hidden");
        $(".time_exceed_round_maximum_time").removeClass("hidden");
    }

    static display_time_less_than_round_maximum_time() {
        $(".time_exceed_round_maximum_time").addClass("hidden");
        $(".time_less_than_round_maximum_time").removeClass("hidden");
    }

    static display_abort_accept_buttons() {
        $(".simulation_results_button").removeClass("hidden");
    }
}