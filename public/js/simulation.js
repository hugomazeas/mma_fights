let current_simulation;
let strikes_data_from_server = [];
let fight;
let simulation_active = false;
$(document).ready(function () {

    let $strike_card_section = $(".strike_card_section");

    $strike_card_section.on("click", ".fight_status", function () {
        $(this).parent().find(".fight_status").removeClass("fight_status_active");
        $(this).addClass("fight_status_active");
    });
    $strike_card_section.on('click', '.strike_card_item', function () {
        SimulationPanel.close_destination_map();
        SimulationPanel.close_significant_strike_option();
        SimulationPanel.select_strike_card($(this).attr("data-strike-type"));
        SimulationPanel.open_significant_strike_option();

    });
    $strike_card_section.on('click', '.significant_strike_option', function () {
        $(".significant_strike_option").removeClass("significant_strike_option_active");
        $(this).toggleClass("significant_strike_option_active");
        SimulationPanel.open_destination_map();
    });
    $strike_card_section.on("click", ".strike_possible_destination", function () {
        if (!current_simulation?.is_running()) {
            Notification.warning("Simulation is not running");
            return;
        }
        SimulationPanel.select_strike_target($(this).attr("data-strike-target"));
        add_new_strike();
        SimulationPanel.select_strike_target();
        SimulationPanel.close_destination_map();
        SimulationPanel.toggle_sig_strike_card();
        SimulationPanel.close_significant_strike_option();
        SimulationPanel.select_strike_card();
    });
});
function initiate_simulation(fight_id) {
    if (fight_id == "") return;
    import_fight(fight_id)
    fight.init_simulations()
    display_round_data(0);
}
function add_new_strike() {
    if (current_simulation?.is_running() == false) return;

    let strike_obj = SimulationPanel.fetch_strike_attributs();
    let strike = current_simulation.new_strike(strike_obj);

    StrikeRegister.add_strike_to_strikeregister(strike.fighter_number, strike);
}
function toggle_start_stop_simulation() {
    if (!simulation_active) {
        SimulationPanel.show_simulation_active();
        current_simulation.clear();
    } else {
        current_simulation.stop();
        SimulationPanel.hide_simulation_active();
    }
}
function toggle_pause_play_simulation() {
    if (current_simulation.is_running()) {
        current_simulation.pause();
        SimulationPanel.pause_simulation();
    } else {
        current_simulation.start();
        SimulationPanel.resume_simulation();
    }
}
function display_round_data(round_id) {
    StrikeRegister.display_strike_registers();

    SimulationPanel.select_round(round_id);

    current_simulation = fight.get_round_simulation(round_id);


    const current_round_strikes = current_simulation.strikes;
    let fighter1_strikes;
    let fighter2_strikes;

    if (round_id == 0) {
        fighter1_strikes = current_round_strikes.filter((strike) => strike.striker_id == fight.fighter1_id);
        fighter2_strikes = current_round_strikes.filter((strike) => strike.striker_id == fight.fighter2_id);
    } else {
        fighter1_strikes = current_round_strikes.filter((strike) => strike.striker_id == fight.fighter1_id);
        fighter2_strikes = current_round_strikes.filter((strike) => strike.striker_id == fight.fighter2_id);
    }

    let fighter1_hits = fighter2_strikes.filter((strike) => strike.sig_strike == true);
    let fighter2_hits = fighter1_strikes.filter((strike) => strike.sig_strike == true);

    let fighter1_hits_head = fighter1_hits.filter((strike) => strike.strike_code.split('_')[2] == "head").length;
    let fighter1_hits_body = fighter1_hits.filter((strike) => strike.strike_code.split('_')[2] == "body").length;
    let fighter1_hits_leg = fighter1_hits.filter((strike) => strike.strike_code.split('_')[2] == "leg").length;
    let fighter1_hits_takedown = fighter1_hits.filter((strike) => strike.strike_code == "TAKEDOWN").length;

    let fighter1_strikes_elbow = fighter1_strikes.filter((strike) => strike.action == "elbow").length;
    let fighter1_strikes_kick = fighter1_strikes.filter((strike) => strike.action == "kick").length;
    let fighter1_strikes_punch = fighter1_strikes.filter((strike) => strike.action == "punch").length;
    let fighter1_strikes_knee = fighter1_strikes.filter((strike) => strike.action == "knee").length;
    let fighter1_strikes_takedown = fighter1_strikes.filter((strike) => strike.strike_code == "TAKEDOWN").length;

    let fighter2_hits_head = fighter2_hits.filter((strike) => strike.strike_target == "head").length;
    let fighter2_hits_body = fighter2_hits.filter((strike) => strike.strike_target == "body").length;
    let fighter2_hits_leg = fighter2_hits.filter((strike) => strike.strike_target == "leg").length;
    let fighter2_hits_takedown = fighter2_hits.filter((strike) => strike.strike_code == "TAKEDOWN").length;

    let fighter2_strikes_elbow = fighter2_strikes.filter((strike) => strike.strike_target == "elbow").length;
    let fighter2_strikes_kick = fighter2_strikes.filter((strike) => strike.strike_target == "kick").length;
    let fighter2_strikes_punch = fighter2_strikes.filter((strike) => strike.strike_target == "punch").length;
    let fighter2_strikes_knee = fighter2_strikes.filter((strike) => strike.strike_target == "knee").length;
    let fighter2_strikes_takedown = fighter2_strikes.filter((strike) => strike.strike_code == "TAKEDOWN").length;

    $("#fighter1_hits_head").text(fighter1_hits_head);
    $("#fighter1_hits_body").text(fighter1_hits_body);
    $("#fighter1_hits_leg").text(fighter1_hits_leg);
    $("#fighter1_hits_takedown").text(fighter1_hits_takedown);

    $("#fighter2_hits_head").text(fighter2_hits_head);
    $("#fighter2_hits_body").text(fighter2_hits_body);
    $("#fighter2_hits_leg").text(fighter2_hits_leg);
    $("#fighter2_hits_takedown").text(fighter2_hits_takedown);

    $("#total_strikes").text(current_round_strikes.length);

    $("#fighter1_strikes_elbow").text(fighter1_strikes_elbow);
    $("#fighter1_strikes_kick").text(fighter1_strikes_kick);
    $("#fighter1_strikes_punch").text(fighter1_strikes_punch);
    $("#fighter1_strikes_knee").text(fighter1_strikes_knee);
    $("#fighter1_strikes_takedown").text(fighter1_strikes_takedown);

    $("#fighter2_strikes_elbow").text(fighter2_strikes_elbow);
    $("#fighter2_strikes_kick").text(fighter2_strikes_kick);
    $("#fighter2_strikes_punch").text(fighter2_strikes_punch);
    $("#fighter2_strikes_knee").text(fighter2_strikes_knee);
    $("#fighter2_strikes_takedown").text(fighter2_strikes_takedown);

    $("#fighter1_name").text(fight.fighter1.full_name);
    $("#fighter2_name").text(fight.fighter2.full_name);

    StrikeRegister.add_strikes_to_strikeregister(1, fighter1_strikes);
    StrikeRegister.add_strikes_to_strikeregister(2, fighter2_strikes);
    // StrikeTimeline.add_strikes(1, fighter1_strikes);
    // StrikeTimeline.add_strikes(2, fighter2_strikes);
}
function import_fight(fight_id) {
    Facade.send_ajax_request('/api/fight/' + fight_id, 'GET', false, null, function (data) {
        let parsed_data = JSON.parse(data.target.response);
        fight = new Fight(parsed_data?.fight_id, parsed_data?.event_id, parsed_data?.fighter1_id, parsed_data?.fighter2_id, parsed_data?.winner_id, parsed_data?.division, parsed_data?.round_length, parsed_data?.card_type, parsed_data?.card_title, parsed_data?.rounds, parsed_data?.ufc_number, parsed_data?.number_round, parsed_data?.win_type);
    });
}
function rollback_seconds(seconds) {
    current_simulation.rollback_seconds(seconds);
    SimulationPanel.highlight_rollback();
}
function forward_seconds(seconds) {
    current_simulation.forward_seconds(seconds);
    SimulationPanel.highlight_rollback();
}
function finish_timer() {
    current_simulation.front_to_end();
    SimulationPanel.highlight_rollback();
}
function reset_timer() {
    current_simulation.back_to_start();
    SimulationPanel.highlight_rollback();
}
function upload_simulation() {
    current_simulation.send_simulation();
    reset_simulation();
}
function reset_simulation() {
    current_simulation.reset();
    reset_timer();
}