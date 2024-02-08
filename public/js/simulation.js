let simulation_active = true;
let current_simulation;
$(document).ready(function () {
    $(".strike_possible_destination").click(function () {
        if (simulation_active) {
            let fighter_number = $(this).attr("data-fighter-number");
            let target = $(this).attr("data-hit-name");
            let sig_strike = true;
            let action = $(".strike_possible_destination_active").attr("data-strike-type");
            let fight_status = $(".fight_status_active").attr("data-fight-status");
            current_simulation.new_strike(fighter_number, action, target, sig_strike, fight_status);
            console.log(current_simulation.strikes);
        } else {
            console.log("Simulation not active");
        }
    });
    $(document).on('click', '.ground_time_start_stop_button', function () {
        if ($(this).hasClass("ground_time_start")) {
            $(this).removeClass("ground_time_start");
            $(this).addClass("ground_time_stop");
            $(this).text("Stop");
        } else {
            $(this).removeClass("ground_time_stop");
            $(this).addClass("ground_time_start");
            $(this).text("Start");
        }
    });
    $(document).on('click', '.strike_card_item', function () {
        if (simulation_active) {
            $(".strike_card_item").removeClass("strike_possible_destination_active");
            $(".strike_destination").css("opacity", "0");
            $(this).addClass("strike_possible_destination_active");
            $(".strike_map_fighter" + $(this).attr("data-fighter-number")).css("opacity", "100");
        } else {
            console.log("Simulation not active");
        }
    });
    $(document).on('click', '.strike_card_item_takedown', function () {
        $(this).parent().find(".takedown_result").toggleClass("hidden");
    });
    $(document).on('click', '.takedown_result', function () {
        $(".strike_card_item_takedown").parent().find(".takedown_result").addClass("hidden");
    });
    
    $(document).on("click", ".fight_status", function () {
        $(this).parent().find(".fight_status").removeClass("fight_status_active");
        $(this).addClass("fight_status_active");
    });
});

function start_simulation(fighter1_id, fighter2_id) {
    let round_id = $(".current_round").attr("data-round-id");
    if (round_id != 0) {
        simulation_active = true;
        current_simulation = new Simulation(fighter1_id, fighter2_id, round_id);
        current_simulation.start();
        $(".fight_status_section").removeClass("hidden");
        $(".fighter_hits_info").addClass("hidden");
        $(".miscellaneous_strikes").removeClass("hidden");
    } else {
        console.log("Select a round to start simulation");
    }
}
function send_simulation_query() {
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