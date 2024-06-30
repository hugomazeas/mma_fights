function debug(variable, wanted_value) {
    if (variable && wanted_value) {
        if (variable == wanted_value) {
            debugger;
        }
    } else {
        debugger;
    }
}
function capitalize_first_letter(str) {
    if (!str) return str;
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
function update_winner_options() {
    let fighter1_id = $('select[name="fighter1_id"]').val();
    let fighter1_text = $('select[name="fighter1_id"] option:selected').text();
    let fighter2_id = $('select[name="fighter2_id"]').val();
    let fighter2_text = $('select[name="fighter2_id"] option:selected').text();

    $('select[name="winner_id"]').empty();
    $('select[name="winner_id"]').append($('<option></option>').val('').text('No Winner yet'));
    if (fighter1_id) {
        $('select[name="winner_id"]').append($('<option></option>').val(fighter1_id).text(fighter1_text));
    }
    if (fighter2_id) {
        $('select[name="winner_id"]').append($('<option></option>').val(fighter2_id).text(fighter2_text));
    }
}