module.exports = (routes) => {
    'use strict';

    const Hapi = require('hapi');

    // Create a server with a host and port
    const server=Hapi.server({
        host:'localhost',
        port:8000
    });

    // Add the route
    for(let i = 0; i < routes.length; i++) {
        server.route(routes[i]);
    }

    // Start the server
    async function start() {

        try {
            await server.start();
        }
        catch (err) {
            console.log(err);
            process.exit(1);
        }

        console.log('Server running at:', server.info.uri);
    };

    start();
};
