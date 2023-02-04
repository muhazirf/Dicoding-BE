const Tiger = require('./Tiger');
const Wolf = require('./Wolf');

const fighting = (tiger, wolf) => {
    if (tiger.strength > wolf.strength) {
        tiger.growl();
        return;
    } else if (wolf.strength > tiger.strength) {
        wolf.howl();
        return;
    } else {
        console.log(`The fight is draw`);
    }
}

const tiger = new Tiger();
const wolf = new Wolf();

fighting(tiger, wolf);
