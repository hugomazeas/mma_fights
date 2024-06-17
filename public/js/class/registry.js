function init_page() {
    let fight_form = Fight.build_form();
    $(".registry_form").html(fight_form);
    $('select[name="fighter1_id"], select[name="fighter2_id"]').change(function () {
        update_winner_options()
    });
    update_winner_options();
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