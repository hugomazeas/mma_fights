$(document).ready(function () {
    $(document).on('click', '#btn_goto_organisations', function () {
       Facade.navigator.go_to("organisations", { org_id: '' });
    });
    $(document).on('click', '#btn_goto_events', function () {
       Facade.navigator.go_to("events", { org_id: 0, event_id: '' });
    });
    $(document).on('click', '#btn_goto_fighters', function () {
       Facade.navigator.go_to("fighters");
    });
    $(document).on('click', '#btn_goto_statistics', function () {

    });
    $(document).on('click', '#btn_goto_registry', function () {
         Facade.navigator.go_to("registry");
     });

    $(document).on('click', '#btn_remove_fight', function () {
        let fight_id = $("#fight_id").val();
        let event_id = $("#event_id").text();
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
    });
    $(document).on('click', '.tags', function () {
        $(this).toggleClass("selected");
    });
});