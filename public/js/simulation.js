let current_simulation;
let strikes_data_from_server = [];
$(document).ready(function () {
    let tracker = new InputTracker();
    tracker.activeTracker();
    
    let url = window.location.href;
    let ids = url.split("/");
    let fight_id = ids[6];
    let event_id = ids[2];
    let org_id = ids[2];
    display_strike(org_id, event_id, fight_id, 0);
    let $strike_card_section = $(".strike_card_section");

    $strike_card_section.on("click", ".fight_status", function () {
        $(this).parent().find(".fight_status").removeClass("fight_status_active");
        $(this).addClass("fight_status_active");
    });
    $strike_card_section.on('click', '.strike_card_item', function () {
        if (current_simulation?.is_running()) {
            SimulationPanel.close_destination_map();
            SimulationPanel.close_significant_strike_option();
            SimulationPanel.select_strike_card($(this).attr("data-strike-type"));
            SimulationPanel.open_significant_strike_option();
        } else {
            console.log("Simulation not active");
        }
    });
    $strike_card_section.on('click', '.significant_strike_option', function () {
        if (!current_simulation?.is_running()) return;

        SimulationPanel.toggle_sig_strike_card();
        SimulationPanel.open_destination_map();
    });
    $strike_card_section.on("click", ".strike_possible_destination", function () {
        SimulationPanel.select_strike_target($(this).attr("data-strike-target"));
        add_new_strike();
        SimulationPanel.select_strike_target();
        SimulationPanel.close_destination_map();
        SimulationPanel.toggle_sig_strike_card();
        SimulationPanel.close_significant_strike_option();
        SimulationPanel.select_strike_card();
    });
});

function add_new_strike() {
    if (current_simulation?.is_running() == false) return;

    let strike_obj = fetch_strike_attributs();
    let strike = current_simulation.new_strike(strike_obj);
    let selector = "#strikebar_" + strike_obj.fighter_number;
    $(selector).prepend(strike.build_html_display());
}
// Frontend Strike "Factory" 
function fetch_strike_attributs() {
    let fighter_number = $(".strike_card_selected").attr("data-fighter-number");
    let action = $(".strike_card_selected").attr("data-strike-type");
    let target = $(".strike_card_selected").attr("data-strike-target");
    let sig_strike = $(".significant_strike_option_active").attr("data-strike-sig");
    let fight_status = $(".fight_status_active").attr("data-fight-status");
    let round_time = $("#round_time").attr("data-time-seconds");
    return { fighter_number, action, target, sig_strike, fight_status, round_time};
}
function start_simulation(fighter1_id, fighter2_id) {
    let round_id = $(".current_round").attr("data-round-id");

    if (!current_simulation && round_id != 0) {
        current_simulation = new Simulation(fighter1_id, fighter2_id, round_id, []);
    }
    if (!current_simulation.is_running()) {
        current_simulation.start();
        SimulationPanel.show_simulation_UI();
    } else {
        current_simulation.stop();
        SimulationPanel.hide_simulation_UI();
    }
}
function send_simulation() {
    $("#simulation_resume_modal").addClass("hidden");
    let strikes = JSON.stringify(current_simulation.strikes);
    $.ajax({
        url: '/simulations/strikes',
        type: 'POST',
        data: strikes,
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
        }
    });
}
function abort_simulation(){
    $("#simulation_resume_modal").addClass("hidden");
    current_simulation.clear();
}
function display_simulation_results(simulation, action_button = false){
    if(action_button){
        $(".simulation_results_button").removeClass("hidden");
        $("#close_modal_simulation_resume").addClass("hidden");
    }else{
        $("#close_modal_simulation_resume").removeClass("hidden");
        $(".simulation_results_button").addClass("hidden");
    }
    $("#simulation_resume_modal").removeClass("hidden");
    $("#resume_round_number").text(simulation.round_id);
    $("#resume_total_strikes").text(simulation.strikes.length);
    $("#fighter1_resume_hits_head").text(simulation.get_fighter_hit_target(simulation.fighter1_id, "head") || 0);
    $("#fighter1_resume_hits_body").text(simulation.get_fighter_hit_target(simulation.fighter1_id, "body") || 0);
    $("#fighter1_resume_hits_leg").text(simulation.get_fighter_hit_target(simulation.fighter1_id, "leg") || 0);
    $("#fighter1_resume_hits_takedown").text(simulation.get_fighter_hit_target(simulation.fighter1_id, "takedown") || 0);
    $("#fighter1_resume_strikes_elbow_accuracy").text(simulation.get_fighter_accuracy_by_action(simulation.fighter1_id, "elbow") || 0);
    $("#fighter1_resume_strikes_punch_accuracy").text(simulation.get_fighter_accuracy_by_action(simulation.fighter1_id, "punch") || 0);
    $("#fighter1_resume_strikes_knee_accuracy").text(simulation.get_fighter_accuracy_by_action(simulation.fighter1_id, "knee") || 0);
    $("#fighter1_resume_strikes_kick_accuracy").text(simulation.get_fighter_accuracy_by_action(simulation.fighter1_id, "kick") || 0);
    $("#fighter1_resume_strikes_elbow").text(simulation.get_fighter_strike_type(simulation.fighter1_id, "elbow") || 0);
    $("#fighter1_resume_strikes_punch").text(simulation.get_fighter_strike_type(simulation.fighter1_id, "punch") || 0);
    $("#fighter1_resume_strikes_knee").text(simulation.get_fighter_strike_type(simulation.fighter1_id, "knee") || 0);
    $("#fighter1_resume_strikes_kick").text(simulation.get_fighter_strike_type(simulation.fighter1_id, "kick") || 0);
    $("#fighter1_resume_strikes_accuracy").text(simulation.get_fighter_accuracy(simulation.fighter1_id) || 0);
    $("#fighter1_resume_takedown_accuracy").text(simulation.get_fighter_takedown_accuracy(simulation.fighter1_id) || 0);

    $("#fighter2_resume_hits_head").text(simulation.get_fighter_hit_target(simulation.fighter2_id, "head") || 0);
    $("#fighter2_resume_hits_body").text(simulation.get_fighter_hit_target(simulation.fighter2_id, "body") || 0);
    $("#fighter2_resume_hits_leg").text(simulation.get_fighter_hit_target(simulation.fighter2_id, "leg") || 0);
    $("#fighter2_resume_hits_takedown").text(simulation.get_fighter_hit_target(simulation.fighter2_id, "takedown") || 0);
    $("#fighter2_resume_strikes_elbow_accuracy").text(simulation.get_fighter_accuracy_by_action(simulation.fighter2_id, "elbow") || 0);
    $("#fighter2_resume_strikes_punch_accuracy").text(simulation.get_fighter_accuracy_by_action(simulation.fighter2_id, "punch") || 0);
    $("#fighter2_resume_strikes_knee_accuracy").text(simulation.get_fighter_accuracy_by_action(simulation.fighter2_id, "knee") || 0);
    $("#fighter2_resume_strikes_kick_accuracy").text(simulation.get_fighter_accuracy_by_action(simulation.fighter2_id, "kick") || 0);
    $("#fighter2_resume_strikes_elbow").text(simulation.get_fighter_strike_type(simulation.fighter2_id, "elbow") || 0);
    $("#fighter2_resume_strikes_punch").text(simulation.get_fighter_strike_type(simulation.fighter2_id, "punch") || 0);
    $("#fighter2_resume_strikes_knee").text(simulation.get_fighter_strike_type(simulation.fighter2_id, "knee") || 0);
    $("#fighter2_resume_strikes_kick").text(simulation.get_fighter_strike_type(simulation.fighter2_id, "kick") || 0);
    $("#fighter2_resume_strikes_accuracy").text(simulation.get_fighter_accuracy(simulation.fighter2_id) || 0);
    $("#fighter2_resume_takedown_accuracy").text(simulation.get_fighter_takedown_accuracy(simulation.fighter2_id) || 0);

}