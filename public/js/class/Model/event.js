class Event {
    constructor(organisation_id, event_id, name, date, location, description) {
        this.event_id = event_id;
        this.organisation_id = organisation_id;
        this.name = name;
        this.date = date;
        this.location = location;
        this.description = description;
    }

    static build_form(event) {
        const action = event ? 'Edit' : 'Add';
        const fields = [
            new FormField("hidden", "organisation_id", "", event ? event.organisation_id : ""),
            new FormField("text", "name", "Name", event ? event.name : ""),
            new FormField("date", "date", "Date", event ? event.date : ""),
            new FormField("text", "location", "Location", event ? event.location : ""),
            new FormField("textarea", "description", "Description", event ? event.description : "")
        ];
        const form = new FormBuilder(`${action} Event`, "event_form", fields);
        return form.build();
    }
    static show_modal_create_form() {
        let form = Event.build_form();
        let modal = new Modal();
        let callback = async function () {
            await Event.submit_create_form();
            Modal.close();
            Facade.refresh_page();
        };
        modal.add_title("Add Event").
            add_content(form).
            add_submit_button("Submit", callback).
            add_close_button("Close").
            show();
    }
    static show_modal_edit_form() {
        let event = CookieManager.decode_cookie(CookieManager.get_cookie('event'));
        let form = Event.build_form(event);
        let modal = new Modal();
        let callback = async function () {
            await Event.submit_edit_form();
            Modal.close();
            Facade.refresh_page();
        }
        modal.add_title("Edit Event").
            add_content(form).
            add_submit_button("Submit", callback).
            add_close_button("Close").
            show();
    }
    static submit_create_form() {
        let event = Event.fetch_form_data();
        Facade.send_ajax_request('/api/event', 'POST', true, event, function () {
            Modal.close();
            Facade.refresh_page();
            Notification.success("Event added successfully");
        });
    }
    static submit_edit_form() {
        let event = Event.fetch_form_data();
        let event_id = CookieManager.decode_cookie(CookieManager.get_cookie('event')).event_id;
        Facade.send_ajax_request('/api/event/' + event_id, 'PUT', true, event, function () {
            Modal.close();
            Notification.success("Event edited successfully");
        });
    }
    static fetch_form_data() {
        return {
            organisation_id: $("[name='organisation_id']").val(),
            name: $("[name='name']").val(),
            date: $("[name='date']").val(),
            location: $("[name='location']").val(),
            description: $("[name='description']").val()
        };
    }
    static delete(event_id) {
        if (confirm("Are you sure you want to delete this event and all it's fight?") === false) return;
        Facade.send_ajax_request('/api/event/' + event_id, 'DELETE', true, null, function () {
            Facade.navigator.go_to_organisations();
            Notification.success("Event deleted successfully");
        });
    }
}