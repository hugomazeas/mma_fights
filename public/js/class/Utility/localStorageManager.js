class LocalStorageManager {
    // Set an item in LocalStorage
    setItem(key, value) {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error('Error setting item in LocalStorage', error);
        }
    }

    // Get an item from LocalStorage
    getItem(key) {
        try {
            const serializedValue = localStorage.getItem(key);
            return serializedValue ? JSON.parse(serializedValue) : null;
        } catch (error) {
            console.error('Error getting item from LocalStorage', error);
            return null;
        }
    }

    // Remove an item from LocalStorage
    removeItem(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing item from LocalStorage', error);
        }
    }

    // Clear all items from LocalStorage
    clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing LocalStorage', error);
        }
    }

    // Get all keys from LocalStorage
    getAllKeys() {
        try {
            return Object.keys(localStorage);
        } catch (error) {
            console.error('Error getting keys from LocalStorage', error);
            return [];
        }
    }
}