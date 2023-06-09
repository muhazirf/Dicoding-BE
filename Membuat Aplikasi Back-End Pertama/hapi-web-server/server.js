console.log("Halo, kita akan belajar membuat server menggunakan Hapi");

const hapi = require("@hapi/hapi");
const routes = require('./routes');

const init = async () => {
    const server = hapi.server({
        port: 5000,
        host: 'localhost',
    });

    server.route(routes);

    await server.start(
        console.log(`Server berjalan pada ${server.info.uri}`));      
};

init();