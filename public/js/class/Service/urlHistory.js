class UrlHistory {
    constructor(maxSize = 5) {
        this.maxSize = maxSize;
        this.queue = [];
    }

    add_url(url) {
        if (this.queue.length >= this.maxSize) {
            this.queue.shift();
        }
        this.queue.push(url);
    }

    get_history() {
        return [...this.queue];
    }

    get_current_url() {
        return this.queue[this.queue.length - 1];
    }
    get_previous_url() {
        this.queue.pop();
        return this.queue[this.queue.length - 1];
    }
}