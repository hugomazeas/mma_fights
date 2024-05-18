class FormBuilder {
    constructor(display_title, form_id, form_fields, width, height) {
        this.display_title = display_title;
        this.form_id = form_id;
        this.form_fields = form_fields;
        this.width = width;
        this.height = height;
    }
    async build() {
        let form = `<div class="max-w-xl m-4 p-10 bg-white rounded shadow-xl" style="width=${this.width}%;height=${this.height}">
                        <h1 class="text-2xl font-semibold text-gray-900">${this.display_title}</h1>
                        <form id="${this.form_id}" class="mt-8 space-y-6">`;

        this.form_fields.forEach(async field => {
            form += field.build();
        });
        form += `</form>
                </div>`;
        return form;
    }
    extract_data() {
        let data = {};
        this.form_fields.forEach(field => {
            data[field.getName()] = field.getValue();
        });
        return data;
    }
}