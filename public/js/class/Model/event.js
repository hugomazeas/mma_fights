class Event{
    constructor(event_id, name, date, location, description){
        this.event_id = event_id;
        this.name = name;
        this.date = date;
        this.location = location;
        this.description = description;
    }
    static build_form(){
        let form = new FormBuilder("Add Event", "event_form", [], 50, 50);
        let formName = new FormField("text", "name", "Name");
        let formDate = new FormField("date", "date", "Date");
        let formLocation = new FormField("text", "location", "Location");
        let formDescription = new FormField("textarea", "description", "Description");
        let formSubmit = new FormField("button", "submit", "Submit");
        form.form_fields.push(formName);
        form.form_fields.push(formDate);
        form.form_fields.push(formLocation);
        form.form_fields.push(formDescription);
        form.form_fields.push(formSubmit);
        return form.build();
    }
    build_form_prefilled(){
        let form = new FormBuilder("Edit Event", "event_form", [], 50, 50);
        let formName = new FormField("text", "name", "Name", this.name);
        let formDate = new FormField("date", "date", "Date", this.date);
        let formLocation = new FormField("text", "location", "Location", this.location);
        let formDescription = new FormField("textarea", "description", "Description", this.description);
        let formSubmit = new FormField("button", "submit", "Submit");
        form.form_fields.push(formName);
        form.form_fields.push(formDate);
        form.form_fields.push(formLocation);
        form.form_fields.push(formDescription);
        form.form_fields.push(formSubmit);
        return form.build();
    }
}