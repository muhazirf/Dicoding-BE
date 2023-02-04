class Wolf {
    constructor() {
        this.strength = Math.floor(Math.random() * 100);
    }
    howl() { // howl() is a method
        console.log(`awooooo!`);
    }
}

module.exports = Wolf;