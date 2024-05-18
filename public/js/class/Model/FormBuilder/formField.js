class FormField {
    constructor(type, name, label, value, options, placeholder, required) {
        this.field = {
            type: type,
            name: name,
            label: label,
            value: value? value : '',
            options: options,
            placeholder: placeholder ? placeholder : '',
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
            case 'textarea':
            case 'date':
            case 'number':
                html = `
                    <div class="mt-4">
                        <label class="block text-sm text-gray-700" for="${name}">${label}</label>
                        <${type === 'textarea' ? 'textarea' : 'input'}
                            type="${type}"
                            class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" 
                            name="${name}" 
                            value="${value}" 
                            placeholder="${placeholder}" 
                            ${required ? 'required' : ''}
                            ${type === 'textarea' ? `>${value}</textarea>` : type === 'button' ? `>${label}</${type === 'textarea' ? 'textarea' : 'input'}>` : ''}>
                    </div>
                `;
                break;
            case 'button':
                html = `
                    <div class="mt-4">
                        <button class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" name="${name}">${label}</button>
                    </div>
                `;
                break;
            case 'cancel_button':
                html = `
                    <div class="mt-4">
                        <button class="px-4 py-1 text-white font-light tracking-wider bg-red-600 rounded" name="${name}" onclick="ModalManager.close();">${label}</button>
                    </div>
                `;
                break;
            case 'select':
                html = `
                    <div class="mt-4">
                        <label class="block text-sm text-gray-700" for="${name}">${label}</label>
                        <select class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" name="${name}" ${required ? 'required' : ''}>
                            ${options.map(option => `<option value="${option.value}">${option.label}</option>`).join('')}
                        </select>
                    </div>
                `;
                break;
            case 'organisation':
            case 'events':
            case 'fighters':
            case 'fights':
            case 'division':
            case 'number_round':
            case 'card_type':
            case 'round_length':
                const data = this.fetchDataSync(`/api/${type}`); 
                if (data) { 
                    html = `
                        <div class="mt-4">
                            <label class="block text-sm text-gray-700" for="${name}">${label}</label>
                            <select class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" name="${name}" ${required ? 'required' : ''}>
                                ${data.map(item => `<option value="${item[`${type.slice(0, -1)}_id`]}">${item.length ||item.name || `${item.first_name} ${item.last_name}` || `${item.fighter1_first_name} ${item.fighter1_last_name } vs ${item.fighter2_first_name} ${item.fighter2_last_name}`}</option>`).join('')} 
                            </select>
                        </div>
                    `;
                } else {
                    console.error("Failed to fetch data for type:", type);
                }
                break;
            default:
                break;
        }

        return html; 
    }

    fetchDataSync(url) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false); // Third parameter 'false' makes it synchronous
        xhr.send();

        if (xhr.status === 200) {
            return JSON.parse(xhr.responseText);
        } else {
            return null;
        }
    }
}