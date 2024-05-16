class Navbar {
    constructor() {
        this.items = [];
    }

    addItem(name, onClick, icon) {
        this.items.push({ name, onClick, icon });
    }

    removeItem(index) {
        this.items.splice(index, 1);
    }

    getItems() {
        return this.items;
    }
}

module.exports = Navbar;