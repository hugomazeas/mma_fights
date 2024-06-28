class Organisation {
    constructor(data) {
        this.organisation_id = data.organisation_id;
        this.name = data.name;
        this.headquarter = data.headquarter;
        this.founded_year = data.founded_year;
    }

    static build_form(organisation) {
        const action = organisation ? 'Edit' : 'Add';
        const fields = [
            new FormField("text", "name", "Name", organisation ? organisation.name : ''),
            new FormField("text", "headquarter", "Headquarter", organisation ? organisation.headquarter : ''),
            new FormField("number", "founded_year", "Founded Year", organisation ? organisation.founded_year : ''),
            new FormField("textarea", "description", "Description", organisation ? organisation.description : '')
        ];
        const form = new FormBuilder(`${action} Organisation`, "organisation_form", fields);
        return form.build();
    }
    static show_modal_create_form() {
        let form = Organisation.build_form();
        let modal = new Modal();

        let callback = async function () {
            await Organisation.submit_create_form();
            Modal.close();
            Facade.refresh_page();
        };
        modal.add_title("Add Organisation").
            add_content(form).
            add_submit_button("Submit", callback).
            add_close_button("Close").
            show();
    }
    static show_modal_edit_form() {
        let organisation = CookieManager.decode_cookie(CookieManager.get_cookie('organisation'));
        let form = Organisation.build_form(organisation);
        let modal = new Modal();
        let callback = async function () {
            await Organisation.submit_edit_form();
            Modal.close();
            Facade.refresh_page();
        }
        modal.add_title("Edit Organisation").
            add_content(form).
            add_submit_button("Submit", callback).
            add_close_button("Close").
            show();
    }
    static async submit_edit_form() {
        let organisation = Organisation.fetch_form_data();
        let org_id = CookieManager.decode_cookie(CookieManager.get_cookie('organisation')).organisation_id;
        Facade.send_ajax_request('/api/organisation/' + org_id, 'PUT', true, organisation, function () {
            Modal.close();
            Notification.success("Organisation edited successfully");
        });
    }
    static async submit_create_form() {
        let organisation = Organisation.fetch_form_data();
        Facade.send_ajax_request('/api/organisation', 'POST', true, organisation, function () {
            Modal.close();
            Notification.success("Organisation added successfully");
        });
    }
    static fetch_form_data() {
        let organisation = {
            name: $("[name='name']").val(),
            headquarter: $("[name='headquarter']").val(),
            founded_year: $("[name='founded_year']").val()
        };
        return organisation;
    }
    static async delete(org_id) {
        if (!confirm("Are you sure you want to delete this organisation and all it's events and fights?")) return;
        Facade.send_ajax_request('/api/organisation/' + org_id, 'DELETE', true, null, function () {
            Facade.navigator.go_to_organisations();
            Notification.success("Organisation deleted successfully");
        });
    }
}