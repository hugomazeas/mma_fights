class Organisation {
    constructor(data) {
        this.org_id = data.org_id;
        this.name = data.name;
        this.headquarter = data.headquarter;
        this.founded_year = data.founded_year;
    }
    static build_form() {
        let form = new FormBuilder("Add Organisation", "organisation_form", [], 50, 50);
        let formName = new FormField("text", "name", "Name");
        let formHeadquarter = new FormField("text", "headquarter", "Headquarter");
        let formFoundedYear = new FormField("number", "founded_year", "Founded Year");
        let formSubmit = new FormField("button", "submit", "Submit");
        form.form_fields.push(formName);
        form.form_fields.push(formHeadquarter);
        form.form_fields.push(formFoundedYear);
        form.form_fields.push(formSubmit);
        return form.build();
    }
    build_form_prefilled() {
        let form = new FormBuilder("Edit Organisation", "organisation_form", [], 50, 50);
        let formName = new FormField("text", "name", "Name", this.name);
        let formHeadquarter = new FormField("text", "headquarter", "Headquarter", this.headquarter);
        let formFoundedYear = new FormField("number", "founded_year", "Founded Year", this.founded_year);
        let formSubmit = new FormField("button", "submit", "Submit");
        form.form_fields.push(formName);
        form.form_fields.push(formHeadquarter);
        form.form_fields.push(formFoundedYear);
        form.form_fields.push(formSubmit);
        return form.build();
    }
}