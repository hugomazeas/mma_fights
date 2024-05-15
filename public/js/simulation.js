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
        if(!current_simulation?.is_running()){
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
function initiate_simulation() {
    let fight_id = CookieManager.getCookie("fight_id");
    if(fight_id == "") return;
    import_fight(fight_id).then(async function () {
        await fight.init_simulations();
        display_strike(0);
    });
}
function add_new_strike() {
    if (current_simulation?.is_running() == false) return;

    let strike_obj = SimulationPanel.fetch_strike_attributs();
    let strike = current_simulation.new_strike(strike_obj);

    add_strike_to_strikesbar(strike_obj.fighter_number, strike);
}
function add_strike_to_strikesbar(fighter_number, strike) {
    let selector = "#strikebar_" + fighter_number;
    let length_strikes = current_simulation.strikes.length - 1;
    $(selector).prepend(strike.build_html_display(length_strikes));
}
function delete_strike(index) {
    current_simulation.strikes.splice(index, 1);
    $(`.delete-btn[data-index="${index}"]`).parent().remove();
}
function toggle_start_stop_simulation() {
    if (simulation_active == false) {
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
async function display_strike(round_id) {

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

    $("#fighter1_name").text(fight.fighter1.first_name + " " + fight.fighter1.last_name);
    $("#fighter2_name").text(fight.fighter2.first_name + " " + fight.fighter2.last_name);
}
function select_round(round_id) {
    setTimeout(() => {
        display_strike(round_id).then(() => {
            $(".strike_card_section").removeClass("disabled");
        });
    }, 300);
    SimulationPanel.select_round(round_id);
}
async function import_fight(fight_id) {
    await $.get('/api/fight/' + fight_id, function (data) {
        fight = new Fight(data?.fight_id, data?.event_id, data?.org_id, data?.fighter1_id, data?.fighter2_id, data?.winner_id, data?.division, data?.round_length, data?.card_type, data?.card_title, data?.rounds);
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