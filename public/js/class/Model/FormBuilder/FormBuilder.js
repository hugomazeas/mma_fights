class FormBuilder {
    constructor(display_title, form_id, form_fields, width, height) {
        this.display_title = display_title;
        this.form_id = form_id;
        this.form_fields = form_fields;
        this.width = width;
        this.height = height;
    }
    build() {
        let field_html = "";
        this.form_fields.forEach(field => {
            field_html += field.build();
        });
        return field_html;
    }
    extract_data() {
        let data = {};
        this.form_fields.forEach(field => {
            data[field.getName()] = field.getValue();
        });
        return data;
    }
}