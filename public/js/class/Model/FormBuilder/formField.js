class FormField {
    constructor(type, name, label, value, options, placeholder, required, callback) {
        this.type = type;
        this.name = name;
        this.label = label ? label : '';
        this.value = value ? value : '';
        this.options = options ? options : [];
        this.placeholder = placeholder ? placeholder : '';
        this.required = required;
        this.callback = callback;

    }

    build() {
        let { type, name, label, value, placeholder, required, options, callback } = this;
        let html = '';

        switch (type) {
            case 'hidden':
                html = `<input type="hidden" name="${name}" value="${value}" placeholder="${placeholder}">`;
                break;
            case 'textarea':
                html = `
                    <div class="mt-4">
                        <label class="block text-sm text-gray-700" for="${name}">${label}</label>
                        <textarea class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded h-48" name="${name}" placeholder="${placeholder}" ${required ? 'required' : ''}>${value}</textarea>
                    </div>
                `;
                break;
            case 'text':
            case 'date':
            case 'number':
                if (type === 'date') value = value.split('T')[0];
                html = `
                <div class="mt-4">
                    <label class="block text-sm text-gray-700" for="${name}">${label}</label>
                    <input type="${type}" class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" name="${name}" value="${value}" placeholder="${placeholder}" ${required ? 'required' : ''}/>
                </div>
                `;
                break;
            case 'button':
                html = `
                    <div class="mt-4">
                        <button class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" onclick="${callback}" name="${name}">${label}</button>
                    </div>
                `;
                break;
            case 'cancel_button':
                html = `
                    <div class="mt-4">
                        <button class="px-4 py-1 text-white font-light tracking-wider bg-red-600 rounded" name="${name}" onclick="Modal.close();">${label}</button>
                    </div>
                `;
                break;
            case 'select':
                html = `
                    <div class="mt-4">
                        <label class="block text-sm text-gray-700" for="${name}">${label}</label>
                        <select class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" name="${name}" ${required ? 'required' : ''}>
                            ${options.map(option => `<option ${option[`${type}_id`] === value ? 'selected' : ''} value="${option.value}">${option.label}</option>`).join('')}
                        </select>
                    </div>
                `;
                break;
            case 'winner_select':
                html = `
                    <div class="mt-4">
                        <label class="block text-sm text-gray-700" for="${name}">${label}</label>
                        <select class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" name="${name}" ${required ? 'required' : ''}>
                            <option value="">Select Winner</option>
                            ${options.map(option => `<option ${option.fighter_id === value ? 'selected' : ''} value="${option.fighter_id}">${option.fighter_name}</option>`).join('')}
                            <option ${options[1].fighter_id === value ? 'selected' : ''} value="${options[1].fighter_id}">${options[1].fighter_name}</option>
                        </select>
                    </div>
                `;
                break;
            case 'organisation':
            case 'event':
            case 'fighter':
            case 'fight':
            case 'division':
            case 'number_round':
            case 'card_type':
            case 'round_length':
            case 'win_type':
                const data = Facade.send_ajax_request(`/api/${type}`, 'GET', false, null, function (data) { });
                if (data) {
                    html = `
                        <div class="mt-4">
                            <label class="block text-sm text-gray-700" for="${name}">${label}</label>
                            <select class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" name="${name}" ${required ? 'required' : ''}>
                                <option value="">Select options</option>
                                ${data.map(item => `<option ${item[`${type}_id`] === value ? 'selected' : ''} value="${item[`${type}_id`]}">${item.length || item.name || item.full_name || `${item.division} (${item.max_weight} lbs)`}</option>`).join('')} 
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
}