class FormField {
    constructor(type, name, label, value, options, placeholder, required) {
        this.field = {
            type: type,
            name: name,
            label: label,
            value: value,
            options: options,
            placeholder: placeholder,
            required: required
        }
    }


    setType(type) {
        this.field.type = type;
    }

    setName(name) {
        this.field.name = name;
    }

    setLabel(label) {
        this.field.label = label;
    }

    setValue(value) {
        this.field.value = value;
    }

    setPlaceholder(placeholder) {
        this.field.placeholder = placeholder;
    }

    setRequired(required) {
        this.field.required = required;
    }

    setOptions(options) {
        this.field.options = options;
    }

    getField() {
        return this.field;
    }
    build() {
        const { type, name, label, value, placeholder, required, options } = this.field;

        let html = '';

        switch (type) {
            case 'text':
                html = `
                        <div class="mt-4">
                            <label class="block text-sm text-gray-00" for="${name}">${label}</label>
                            <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" type="text" name="${name}" value="${value}" placeholder="${placeholder}" ${required ? 'required' : ''}>
                        </div>
                    `;
                break;
            case 'select':
                html = `
                        <div class="mt-4">
                            <label class="block text-sm text-gray-00" for="${name}">${label}</label>
                            <select class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" name="${name}" ${required ? 'required' : ''}>
                                ${options.map(option => `<option value="${option.value}">${option.label}</option>`).join('')}
                            </select>
                        </div>
                    `;
                break;
            case 'textarea':
                html = `
                        <div class="mt-4">
                            <label class="block text-sm text-gray-00"  for="${name}">${label}</label>
                            <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" name="${name}" placeholder="${placeholder}" ${required ? 'required' : ''}>${value}</textarea>
                        </div>
                    `;
                break;
            case 'date':
                html = `
                        <div class="mt-4">
                            <label class="block text-sm text-gray-00"  for="${name}">${label}</label>
                            <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" type="date" name="${name}" value="${value}" ${required ? 'required' : ''}>
                        </div>
                    `;
                break;
            case 'number':
                html = `
                        <div class="mt-4">
                            <label class="block text-sm text-gray-00"  for="${name}">${label}</label>
                            <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" type="number" name="${name}" value="${value}" ${required ? 'required' : ''}>
                        </div>
                    `;
                break;
            case 'button':
                html = `
                        <div class="mt-4">
                            <button class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" name=${name}>${label}</button>
                        </div>
                    `;
                break;
            default:
                html = '';
        }

        return html;
    }
}