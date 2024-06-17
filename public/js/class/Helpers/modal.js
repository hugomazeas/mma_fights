class Modal {
    static opened_modals = [];
    constructor(title, content, zIndex) {
        this.title = title;
        this.content = content;
        this.height = 100;
        this.width = 100;
        this.zIndex = zIndex;
    }

    build_html(close_button = true) {
        let id = getRandomNumber();
        let html =  `
        <div id="${id}" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true" style="width:${this.width}%;height:${this.height}%;z-index:${this.zIndex}">
            ${this.content}
        </div>`;
        html += close_button ? `<button onclick="Modal.close()" class="z-40 absolute top-0 right-0 p-2 text-white bg-red-500 hover:bg-red-700">X</button>` : '';
        return html;
    }

    show() {
        let html = this.build_html();
        let $modal = $(html);
        Modal.opened_modals.push($modal);
        $("body").append($modal);
    }

    static close() {
        if (Modal.opened_modals.length > 0) {
            let $modal = Modal.opened_modals.pop();
            $modal.remove();
        }
    }


}