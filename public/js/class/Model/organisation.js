class Organisation {
    constructor(data) {
        this.org_id = data.organisation_id;
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
    static async show_modal_form() {
        let form = await Organisation.build_form();
        let modal = new ModalManager("Add organisation", form, 3);
        modal.show();
    }
    static async submit_form() {
        let organisation = {
            name: $("[name='name']").val(),
            headquarter: $("[name='headquarter']").val(),
            founded_year: $("[name='founded_year']").val()
        };
        Facade.send_ajax_request('/api/organisation', 'POST', true, organisation, function () {
            ModalManager.close();
            Facade.refresh_page();
        });
    }
    static async delete(org_id) {
        Facade.send_ajax_request('/api/organisation/' + org_id, 'DELETE', true, null, function () {
            Facade.navigator.display_url('/organisations');
        });
    }
}