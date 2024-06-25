class Organisation {
    constructor(data) {
        this.organisation_id = data.organisation_id;
        this.name = data.name;
        this.headquarter = data.headquarter;
        this.founded_year = data.founded_year;
    }
    static build_form() {
        let form = new FormBuilder("Add Organisation", "organisation_form", [], 50, 50);
        let formName = new FormField("text", "name", "Name");
        let formHeadquarter = new FormField("text", "headquarter", "Headquarter");
        let formFoundedYear = new FormField("number", "founded_year", "Founded Year");
        let formDescription = new FormField("textarea", "description", "Description", this.description);
        let formCancel = new FormField("cancel_button", "cancel", "Cancel");
        let formSubmit = new FormField("button", "submit", "Submit", "", "", "", "", "Organisation.submit_form()");

        form.form_fields.push(formName);
        form.form_fields.push(formHeadquarter);
        form.form_fields.push(formFoundedYear);
        form.form_fields.push(formDescription);
        form.form_fields.push(formCancel);
        form.form_fields.push(formSubmit);
        return form.build();
    }
    static build_form_prefilled(organisation){
        let form = new FormBuilder("Edit Organisation", "organisation_form", [], 50, 50);
        let formName = new FormField("text", "name", "Name", organisation.name);
        let formHeadquarter = new FormField("text", "headquarter", "Headquarter", organisation.headquarter);
        let formFoundedYear = new FormField("number", "founded_year", "Founded Year", organisation.founded_year);
        let formDescription = new FormField("textarea", "description", "Description", organisation.description);
        let formCancel = new FormField("cancel_button", "cancel", "Cancel");
        let formSubmit = new FormField("button", "submit", "Submit", "", "", "", "", "Organisation.submit_form()");

        form.form_fields.push(formName);
        form.form_fields.push(formHeadquarter);
        form.form_fields.push(formFoundedYear);
        form.form_fields.push(formDescription);
        form.form_fields.push(formCancel);
        form.form_fields.push(formSubmit);
        return form.build();
    }
    static async show_modal_form() {
        let form = await Organisation.build_form();
        let modal = new Modal("Add organisation", form, 3);
        modal.show();
    }
    static async show_modal_edit_organisation() {
        let organisation = CookieManager.decode_cookie(CookieManager.get_cookie('organisation'))
        let form = await Organisation.build_form_prefilled(organisation);
        let modal = new Modal("Edit organisation", form, 3);
        modal.show();
    }
    static async submit_edit_form() {
        let organisation = {
            name: $("[name='name']").val(),
            headquarter: $("[name='headquarter']").val(),
            founded_year: $("[name='founded_year']").val()
        };
        let org_id = Facade.dataStore.get('organisation').organisation_id;
        Facade.send_ajax_request('/api/organisation/' + org_id, 'PUT', true, organisation, function () {
            Modal.close();
            Notification.success("Organisation edited successfully");
        });
    }
    static async submit_form() {
        let organisation = {
            name: $("[name='name']").val(),
            headquarter: $("[name='headquarter']").val(),
            founded_year: $("[name='founded_year']").val()
        };
        Facade.send_ajax_request('/api/organisation', 'POST', true, organisation, function () {
            Modal.close();
            Notification.success("Organisation added successfully");
        });
    }
    static async delete(org_id) {
        if (confirm("Are you sure you want to delete this organisation and all it's events and fights?") === false) return;
        Facade.send_ajax_request('/api/organisation/' + org_id, 'DELETE', true, null, function () {
            Facade.navigator.go_to_organisations();
            Notification.success("Organisation deleted successfully");
        });
    }
}