class Event{
    constructor(organisation_id, event_id, name, date, location, description){
        this.event_id = event_id;
        this.organisation_id = organisation_id;
        this.name = name;
        this.date = date;
        this.location = location;
        this.description = description;
    }
    static build_form(){
        let org_id = parseInt(Facade.dataStore.get('organisation').organisation_id);
        let form = new FormBuilder("Add Event", "event_form", [], 50, 50);
        let formOrgId = new FormField("hidden", "organisation_id", "", org_id, "", org_id, true);
        let formName = new FormField("text", "name", "Name");
        let formDate = new FormField("date", "date", "Date");
        let formLocation = new FormField("text", "location", "Location");
        let formDescription = new FormField("textarea", "description", "Description");
        let formCancel = new FormField("cancel_button", "cancel", "Cancel");
        let formSubmit = new FormField("button", "submit", "Submit", "", "", "", "", "Event.submit_form()");
        form.form_fields.push(formOrgId);
        form.form_fields.push(formName);
        form.form_fields.push(formDate);
        form.form_fields.push(formLocation);
        form.form_fields.push(formDescription);
        form.form_fields.push(formCancel);
        form.form_fields.push(formSubmit);
        return form.build();
    }
    static async show_modal_form() {
        let form = await Event.build_form();
        let modal = new Modal("Add event", form, 3);
        modal.show();
    }
    static async submit_form() {
        let event = {
            organisation_id: $("[name='organisation_id']").val(),
            name: $("[name='name']").val(),
            date: $("[name='date']").val(),
            location: $("[name='location']").val(),
            description: $("[name='description']").val()
        };
        Facade.send_ajax_request('/api/event', 'POST', true, event, function () {
            Modal.close();
            Facade.refresh_page();
        });
    }
    static async delete(event_id) {
        Facade.send_ajax_request('/api/event/' + event_id, 'DELETE', true, null, function () {
            Facade.navigator.display_url('/events');
        });
    }
}