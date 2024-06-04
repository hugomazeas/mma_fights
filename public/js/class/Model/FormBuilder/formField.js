class FormField {
    constructor(type, name, label, value, options, placeholder, required, callback) {
        this.type = type;
        this.name = name;
        this.label = label ? label : '';
        this.value = value ? value : '';
        this.options = options;
        this.placeholder = placeholder ? placeholder : '';
        this.required = required;
        this.callback = callback;
       
    }

    build() { 
        const { type, name, label, value, placeholder, required, options, callback } = this;
        let html = '';

        switch (type) {
            case 'hidden':
                html = `<input type="hidden" name="${name}" value="${value}" placeholder="${placeholder}">`;
                break;
            case 'text':
            case 'textarea':
            case 'date':
            case 'number':
                html = `
                    <div class="mt-4">
                        <label class="block text-sm text-gray-700" for="${name}">${label}</label>
                        <${type === 'textarea' ? 'textarea' : 'input'}
                            type="${type}"
                            class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded ${type === 'textarea' ? 'h-48' : ''}" 
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
                        <button class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" onclick="${callback}" name="${name}">${label}</button>
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
            case 'event':
            case 'fighter':
            case 'fight':
            case 'division':
            case 'number_round':
            case 'card_type':
            case 'round_length':
                const data = Facade.send_ajax_request(`/api/${type}`, 'GET', false, null, function (data){});
                if (data) { 
                    html = `
                        <div class="mt-4">
                            <label class="block text-sm text-gray-700" for="${name}">${label}</label>
                            <select class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" name="${name}" ${required ? 'required' : ''}>
                                ${data.map(item => `<option value="${item[`${type}_id`]}">${item.length || item.name || item.full_name || `${item.division} (${item.max_weight} lbs)`}</option>`).join('')} 
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