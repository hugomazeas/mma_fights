class List {
    constructor(itemType) {
        this.items = [];
        this.type = itemType;
    }

    isValidType(item) {
        return item instanceof this.type;
    }

    add(item) {
        if (this.isValidType(item)) {
            this.items.push(item);
        } else {
            throw new TypeError(`Invalid type: expected ${this.type.name}, got ${typeof item}`);
        }
    }

    remove(index) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
        } else {
            console.error('Index out of bounds');
        }
    }

    get(index) {
        if (index >= 0 && index < this.items.length) {
            return this.items[index];
        } else {
            console.error('Index out of bounds');
            return undefined;
        }
    }

    size() {
        return this.items.length;
    }

    isEmpty() {
        return this.items.length === 0;
    }

    clear() {
        this.items = [];
    }

    display() {
        return `List of ${this.type.name}: [${this.items.join(', ')}]`;
    }
}