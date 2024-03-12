let current_simulation;
let strikes_data_from_server = [];
$(document).ready(function () {
    let tracker = new InputTracker();
    tracker.activeTracker();
    let $strike_card_section = $(".strike_card_section");

    $strike_card_section.on("click", ".fight_status", function () {
        $(this).parent().find(".fight_status").removeClass("fight_status_active");
        $(this).addClass("fight_status_active");
    });
    $strike_card_section.on('click', '.strike_card_item', function () {
        if (current_simulation?.is_running()) {
            close_destination_map();
            close_significant_strike_option();
            select_strike_card($(this).attr("data-strike-type"));
            open_significant_strike_option();
        } else {
            console.log("Simulation not active");
        }
    });
    $strike_card_section.on('click', '.significant_strike_option', function () {
        if (!current_simulation?.is_running()) return;

        select_sig_strike_card($(this).attr("data-strike-sig"));
        open_destination_map();
    });
    $strike_card_section.on("click", ".strike_possible_destination", function () {
        select_strike_target($(this).attr("data-strike-target"));
        add_new_strike();
        select_strike_target();
        close_destination_map();
        select_sig_strike_card();
        close_significant_strike_option();
        select_strike_card();
    });
});
function select_strike_target(target) {
    $(".strike_possible_destination").removeClass("strike_possible_destination_active");
    if(target){
        $(".strike_card_selected").attr("data-strike-target", target);
        $(".strike_card_selected").parent().find(".strike_possible_destination[data-strike-target='" + target + "']").addClass("strike_possible_destination_active");
    }
}
function select_strike_card(action) {
    $(".strike_card_item").removeClass("strike_card_selected");
    if(action){
        let fighter_number = $(".fighters_strike_cards").attr("data-fighter-selected");
        $("#fighter" + fighter_number + "_"  + action + "_line").find(".strike_card_item[data-strike-type='" + action + "']").addClass("strike_card_selected");
    }
}
function select_sig_strike_card(sig_strike) {
    $(".significant_strike_option").css("opacity", "50%").removeClass("significant_strike_option_active");
    if(sig_strike){
        $(".significant_strike_option[data-strike-sig='" + sig_strike + "']").addClass("significant_strike_option_active");
        $(".significant_strike_option[data-strike-sig='" + sig_strike + "']").css("opacity", "100%");
    }
}
function get_current_fighter_line() {
    let fighter_number = $(".fighters_strike_cards").attr("data-fighter-selected");
    let strike_action = $(".strike_card_selected").attr("data-strike-type");
    return $(`#fighter${fighter_number}_${strike_action}_line`);
}
function close_significant_strike_option() {
    $(".significant_strike_option").removeClass("significant_strike_option_active");
    get_current_fighter_line().find(".significant_strike").addClass("hidden");
}
function open_significant_strike_option() {
    get_current_fighter_line().find(".significant_strike").removeClass("hidden");
}
function close_destination_map() {
    $(".strike_possible_destination").removeClass("strike_possible_destination_active");
    get_current_fighter_line().find(".strike_map_destination").addClass("hidden");
}
function open_destination_map() {
    get_current_fighter_line().find(".strike_map_destination").removeClass("hidden");
}
function add_new_strike() {
    if (current_simulation?.is_running() == false) return;

    let strike = fetch_strike_attributs();
    current_simulation.new_strike(strike);
}
// Frontend Strike "Factory" 
function fetch_strike_attributs() {
    let fighter_number = $(".strike_card_selected").attr("data-fighter-number");
    let action = $(".strike_card_selected").attr("data-strike-type");
    let target = $(".strike_card_selected").attr("data-strike-target");
    let sig_strike = $(".significant_strike_option_active").attr("data-strike-sig");
    let fight_status = $(".fight_status_active").attr("data-fight-status");
    return { fighter_number, action, target, sig_strike, fight_status };
}
function start_simulation(fighter1_id, fighter2_id) {
    let round_id = $(".current_round").attr("data-round-id");
    if (!current_simulation && round_id != 0) {
        current_simulation = new Simulation(fighter1_id, fighter2_id, round_id, []);
    }
    if (!current_simulation.is_running()) {
        current_simulation.start();
        show_simulation_UI();
    } else {
        current_simulation.stop();
        hide_simulation_UI();
    }
}
function hide_simulation_UI() {
    $(".fighter_body_image").removeClass("hidden");
    $("#btn_start_simulation").text("Start Simulation");
    $(".round_selector_section").removeClass("disabled");
    $(".fight_status_section").addClass("hidden");
    $(".fighter_hits_info").removeClass("hidden");
    $(".miscellaneous_strikes").addClass("hidden");
}
function show_simulation_UI() {
    $(".fighter_body_image").addClass("hidden");
    $("#btn_start_simulation").text("Stop simulation");
    $(".round_selector_section").addClass("disabled");
    $(".fight_status_section").removeClass("hidden");
    $(".fighter_hits_info").addClass("hidden");
    $(".miscellaneous_strikes").removeClass("hidden");
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