class Modal {
    static opened_modals = [];
    constructor() {
        this.width = 50;
        this.height = 50;
        this.modal_id = getRandomNumber();
    }
    add_title(title) {
        this.title = title;
        return this;
    }
    add_submit_button(text, callback) {
        this.submit_button_id = getRandomNumber();
        this.submit_button = `<button id="${this.submit_button_id}" class="p-2 bg-blue-400 rounded-lg hover:bg-blue-700 text-white">${text}</button>`;
        this.submit_callback = callback;
        return this;
    }
    add_close_button(text, callback) {
        if (!callback) {
            callback = Modal.close;
        }
        this.close_button_id = getRandomNumber();
        this.close_button = `<button id="${this.close_button_id}" class="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">${text}</button>`;
        this.close_callback = callback;
        return this;
    }
    add_supporting_button(text, callback) {
        this.supporting_button_id = getRandomNumber();
        this.supporting_button = `<button id="${this.supporting_button_id}" class="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">${text}</button>`;
        this.supporting_callback = callback;
        return this;
    }
    add_content(content) {
        this.content = content;
        return this;
    }
    build_html() {
        let html = `
            <div class="relative z-10" id="modal_${this.modal_id}"aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div>
                                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 class="text-base font-semibold leading-6 text-gray-900 text-xl" id="modal-title">${this.title ? this.title : ''}</h3>
                                        <div class="mt-2">
                                            ${this.content}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-between">
                            ${this.close_button ? this.close_button : ''}
                            ${this.supporting_button ? this.supporting_button : ''}
                            ${this.submit_button ? this.submit_button : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return html;
    }
    static close() {
        let modal = Modal.opened_modals.pop();
        if (!modal) return;
        $(`#modal_${modal.modal_id}`).remove();
    }
    show() {
        let html = this.build_html();
        $("body").append(html);
        $(`#${this.submit_button_id}`).click(this.submit_callback);
        $(`#${this.close_button_id}`).click(this.close_callback);
        $(`#${this.supporting_button_id}`).click(this.supporting_callback);
        Modal.opened_modals.push(this);
    }
}