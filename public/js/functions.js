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
function change_time_speed() {
    let time_speed = $("#btn_time_speed").attr("data-time-speed");
    let index = Simulation.time_speed.indexOf(parseFloat(time_speed));
    let next_time_speed = Simulation.time_speed[(index + 1) % Simulation.time_speed.length];
    current_simulation.set_factor(next_time_speed);

    $("#btn_time_speed").attr("data-time-speed", next_time_speed);
    $("#btn_time_speed").text(next_time_speed + "x");
}
function capitalize_first_letter(str) {
    if(!str) return str;
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
function getRandomNumber() {
    return Math.floor(Math.random() * 999999) + 1;
}
