function deleteOrganisation(id) {
    $.ajax({
        url: '/organisations/' + id,
        type: 'DELETE',
        contentType: 'application/json',
        success: function (data) {
            $("#btn_goto_organisation").trigger("click");
        }
    });
}
function editOrganisation(id) {
    $(".form_title").html("Edit Organisation");
    $("#btn_add_organisation").text("Edit Organisation");
    $.get('/organisations/' + id, function (data) {
        $("#organisation_name").val(data.name);
        $("#organisation_headquarters").val(data.headquarters);
        $("#organisation_founded_year").val(data.founded_year);
        $("#btn_add_organisation").addClass("hidden");
        $("#btn_edit_organisation").removeClass("hidden");
        $("#organisation_id").val(id);
    });
}
function deleteFight(event_id, fight_id) {
    let current_url = window.location.href;
    let organisation_id = current_url.split("/")[4];
    $.ajax({
        url: '/organisations/' + organisation_id + '/events/' + event_id + '/fights/' + fight_id,
        type: 'DELETE',
        contentType: 'application/json',
        success: function (data) {
            display_url('/organisations/' + organisation_id + '/events/' + event_id);
        }
    });
}
function detailOrganisation(org_id) {
    display_url('/organisations/' + org_id);
}
function detailEvent(org_id, event_id) {
    display_url('/organisations/' + org_id + '/events/' + event_id);
}
function detailFight(org_id, event_id, fight_id) {
    display_url('/organisations/' + org_id + '/events/' + event_id + '/fights/' + fight_id);
    display_strike(org_id, event_id, fight_id, 0)
}
function display_url(url) {
    console.log("Going to " + url);
    history.pushState(null, null, url);

    $.ajax({
        url: url,
        type: 'GET',
        cache: false, // Add cache: false
        success: function (htmlResponse) {
            let main_container = htmlResponse.split("<div class=\"main_container\">")[1];

            main_container = main_container.replace(/\\n/g, '');
            main_container = main_container.substring(0, main_container.length - 49);
            $(".main_container").html(main_container);
            update_breadscrum();
        }
    });
}
function update_breadscrum() {
    let url = window.location.href;
    let ids = url.split("/").splice(3);
    $("#breadscrum").empty();
    let link = "";
    for (let index = 0; index < ids.length; index += 2) {
        link += "/" + ids[index] + "/" + ids[(index + 1)];
        if (index < ids.length - 2) {
            $("#breadscrum").append(`<li><a href="javascript:;" onclick="display_url('${link}')" class="text-blue-500">${capitalize_first_letter(ids[index])}</a></li>`);
        } else {
            $("#breadscrum").append(`<li><a>${capitalize_first_letter(ids[index])}</a></li>`);
        }
        $("#breadscrum").append(`<li><span class="mx-2">/</span></li>`);
    }
}
async function display_strike(org_id, event_id, fight_id, round_id) {

    current_simulation = new Simulation(round_id, event_id, org_id, fight_id);
    await current_simulation.initialize();
    let fight = current_simulation.fight;

    $("#fighter1_name").text(fight.fighter1_first_name + " " + fight.fighter1_last_name);
    $("#fighter2_name").text(fight.fighter2_first_name + " " + fight.fighter2_last_name);

    const current_round_strikes = round_id != 0 ? current_simulation.strikes.filter((strike) => strike.round_id == round_id) : current_simulation.strikes;
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

}
function select_round(org_id, event_id, fight_id, round_id) {
    current_simulation.get_strike_existing_round(round_id);
    $(".round_selector").removeClass("current_round");
    $("#round_selector_" + round_id).addClass("current_round");
    $('.strike_card_section').addClass("disabled");

    setTimeout(() => {
        display_strike(org_id, event_id, fight_id, round_id).then(() => {
            $(".strike_card_section").removeClass("disabled");
        });
    }, 300);

    if (round_id == 0) {
        $("#round_number").text("-");
        $("#btn_start_simulation").addClass("disabled");
        $("#toggleSimulation").prop("disabled", true);
    } else {
        $("#round_number").text(round_id);
        $("#btn_start_simulation").removeClass("disabled");
        $("#toggleSimulation").prop("disabled", false);
    }
}
function change_time_speed() {
    let time_speed = $("#btn_time_speed").attr("data-time-speed");
    let index = Simulation.time_speed.indexOf(parseFloat(time_speed));
    let next_time_speed = Simulation.time_speed[(index + 1) % Simulation.time_speed.length];
    current_simulation.set_factor(next_time_speed);

    $("#btn_time_speed").attr("data-time-speed", next_time_speed);
    $("#btn_time_speed").text(next_time_speed + "x");
}
function capitalize_first_letter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function to_MM_SS_MS(milliseconds) {
    let minutes = Math.floor(milliseconds / 60000);
    let remainingSeconds = Math.floor((milliseconds % 60000) / 1000);
    let remainingMilliseconds = milliseconds % 1000;
    let formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    let formattedMilliseconds = remainingMilliseconds < 10 ? '00' + remainingMilliseconds : remainingMilliseconds < 100 ? '0' + remainingMilliseconds : remainingMilliseconds;
    return minutes + ":" + formattedSeconds + "." + formattedMilliseconds;
}
function format_seconds(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    let formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    return minutes + ":" + formattedSeconds;
}
