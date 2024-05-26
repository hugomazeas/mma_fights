class DataStore {
    constructor() {
        this.data = {};
    }

    init() {
        const keys = LocalStorageManager.get_all_keys();
        keys.forEach(key => {
            this.data[key] = LocalStorageManager.get_item(key);
        });
    }

    set(key, value) {
        this.data[key] = value;
        LocalStorageManager.set_item(key, value);
    }

    get(key) {
        return this.data[key];
    }

    keys() {
        return Object.keys(this.data);
    }

}