let current_simulation;
let strike_destination_map_opened = false;
$(document).ready(function () {
    let tracker = new InputTracker();
    tracker.activeTracker();
    let $strike_card_section = $(".strike_card_section");
    $strike_card_section.on("click", ".strike_possible_destination", function () {
        $(this).parent().attr("data-strike-target", $(this).attr("data-strike-target"));
        add_new_strike.call(this);
    });
    $strike_card_section.on('click', '.strike_card_item', function () {
        if (current_simulation?.is_running()) {
            if (strike_destination_map_opened) {
                close_destination_map();
            } else {
                let fighter_number = $(this).attr("data-fighter-number");
                let strike_action = $(this).attr("data-strike-type");
                activate_strike_card(strike_action, fighter_number);
            }
        } else {
            console.log("Simulation not active");
        }
    });
    $strike_card_section.on('click', '.strike_card_item_takedown', function () {
        $(".takedown_result").toggleClass("hidden");
    });
    $strike_card_section.on('click', '.takedown_result', function () {
        $(this).toggleClass("hidden");
    });
    $strike_card_section.on("click", ".fight_status", function () {
        $(this).parent().find(".fight_status").removeClass("fight_status_active");
        $(this).addClass("fight_status_active");
    });
});
function add_new_strike(_this) {
    if (!current_simulation.is_running()) {
        console.log("Simulation not active");
        return;
    }

    let strike = fetch_hit_attributs();
    console.log(strike);
    current_simulation.new_strike(strike);
    close_destination_map();
}

function activate_strike_card(strike_action, fighter_number) {
    $(".fighter" + fighter_number + "_strike_card").find(".strikes_items").attr("data-strike-selected", strike_action);
    $(".strike_card_item").removeClass("strike_possible_destination_active");
    $("#fighter" + fighter_number + "_strikes_" + strike_action).parent().addClass("strike_possible_destination_active");

    open_destination_map(fighter_number);
}
function open_destination_map(fighter_number) {
    strike_destination_map_opened = true;
    $(".strike_destination").css("opacity", "0");
    $(".strike_map_fighter" + fighter_number).css("opacity", "100");
}
function close_destination_map() {
    strike_destination_map_opened = false;
    $(".strike_card_item").removeClass("strike_possible_destination_active");
    $(".strike_destination").css("opacity", "0");
}
// Frontend "Factory" 
function fetch_hit_attributs() {
    let fighter_number = $(".fighters_strike_cards").attr("data-fighter-selected");
    let action = $(".fighter" + fighter_number + "_strike_card").find(".strikes_items").attr("data-strike-selected");
    let target = $(".fighter" + fighter_number + "_strike_card").find(".strike_destination").attr("data-strike-target");
    let sig_strike = true;
    let fight_status = $(".fight_status_active").attr("data-fight-status");
    return { fighter_number, action, target, sig_strike, fight_status };
}
function start_simulation(fighter1_id, fighter2_id) {
    let round_id = $(".current_round").attr("data-round-id");
    if (round_id != 0) {
        current_simulation = new Simulation(fighter1_id, fighter2_id, round_id);
        current_simulation.start();
        $(".fight_status_section").removeClass("hidden");
        $(".fighter_hits_info").addClass("hidden");
        $(".miscellaneous_strikes").removeClass("hidden");
    } else {
        console.log("Select a round to start simulation");
    }
}
function send_simulation() {
    let strikes = current_simulation.getJSON();
    $.ajax({
        url: '/organisations/' + org_id + '/events/' + event_id + '/fights/' + fight_id + '/rounds/' + round_id + '/strikes',
        type: 'POST',
        data: { strikes: strikes },
        contentType: 'application/json',
        success: function (data) {
            // display_strike(org_id, event_id, fight_id, strike.round_id);
            console.log("Simulation query sent");
        }
    });
}