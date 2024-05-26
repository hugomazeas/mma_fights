class LocalStorageManager {
    static set_item(key, value) {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error('Error setting item in LocalStorage', error);
        }
    }

    static get_item(key) {
        try {
            const serializedValue = localStorage.getItem(key);
            return serializedValue ? JSON.parse(serializedValue) : null;
        } catch (error) {
            console.error('Error getting item from LocalStorage', error);
            return null;
        }
    }

    static remove_item(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing item from LocalStorage', error);
        }
    }

    static clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing LocalStorage', error);
        }
    }

    static get_all_keys() {
        try {
            return Object.keys(localStorage);
        } catch (error) {
            console.error('Error getting keys from LocalStorage', error);
            return [];
        }
    }
}