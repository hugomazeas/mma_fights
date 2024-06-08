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
    $(document).on('click', '#btn_add_organisation', function () {
        let organisation = {
            name: $("#organisation_name").val(),
            headquarters: $("#organisation_headquarters").val(),
            foundedYear: $("#organisation_founded_year").val(),
        };
        if (organisation.name != "" && organisation.headquarters != "" && organisation.foundedYear != "") {
            $.ajax({
                url: '/organisations',
                type: 'POST',
                data: JSON.stringify({ organisation: organisation }),
                contentType: 'application/json',
                success: function (data) {
                    $("#btn_goto_organisation").trigger("click");
                }
            });
        } else {
            alert("Please fill all the fields");
        }
    });
    $(document).on('click', '#btn_edit_organisation', function () {
        let organisation = {
            name: $("#organisation_name").val(),
            headquarters: $("#organisation_headquarters").val(),
            foundedYear: $("#organisation_founded_year").val(),
        };
        let id = $("#organisation_id").val();
        if (organisation.name != "" && organisation.headquarters != "" && organisation.foundedYear != "") {
            $.ajax({
                url: '/organisations/' + id,
                type: 'PUT',
                data: JSON.stringify({ organisation: organisation }),
                contentType: 'application/json',
                success: function (data) {
                    $("#btn_goto_organisation").trigger("click");
                }
            });
        } else {
            alert("Please fill all the fields");
        }
    });
    $(document).on('click', '#btn_add_event', function () {
        let event = {
            name: $("#event_name").val(),
            date: $("#event_date").val(),
            organisation_id: $("#event_organisation").val(),
            location: $("#event_location").val(),
        };
        if (event.name != "" && event.date != "" && event.organisation_id != "" && event.location != "") {
            $.ajax({
                url: '/organisations/' + organisation_id + '/events',
                type: 'POST',
                data: JSON.stringify({ event: event }),
                contentType: 'application/json',
                success: function (data) {
                    $("#btn_goto_events").trigger("click");
                }
            });
        } else {
            alert("Please fill all the fields");
        }
    });
    $(document).on('click', '#btn_add_fight', function () {
        let fight = {
            event_id: $("#event_id").text(),
            fighter1_id: $("#fighter1").val(),
            fighter2_id: $("#fighter2").val(),
            division: $("#weight-division").val(),
            card_type: $("#card-type").val(),
        };
        let current_url = window.location.href;
        let organisation_id = current_url.split("/")[4];
        if (fight.event_id != "" && fight.fighter1_id != "" && fight.fighter2_id != "" && fight.division != "" && fight.card_type != "") {
            $.ajax({
                url: '/organisations/' + organisation_id + '/events/' + fight.event_id + '/fights',
                type: 'POST',
                data: JSON.stringify({ fight: fight }),
                contentType: 'application/json',
                success: function (data) {
                    display_url('/organisations/' + organisation_id + '/events/' + fight.event_id);
                }
            });
        } else {
            alert("Please fill all the fields");
        }
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
    update_breadscrum();
});