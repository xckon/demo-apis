const jsonDatastore = require('json-data-store');

module.exports = [
    {
        method: 'GET',
        path: '/barrio',
        handler: (request, h) => {
            const url = 'http://' + request.info.host;

            const resultados = jsonDatastore.barrios.map((barrio) => {
                const bibliotecas = jsonDatastore.filtrarPorCampoString(
                    jsonDatastore.bibliotecas,
                    'barrio',
                    barrio.barrio);

                const obras = jsonDatastore.filtrarPorCampoString(
                    jsonDatastore.obras,
                    'barrio',
                    barrio.barrio);

                barrio.bibliotecas = bibliotecas.map((item) => {
                    return {biblioteca: url + '/biblioteca/' + item.biblioteca};
                });

                barrio.obras = obras.map((item) => {
                    return {biblioteca: url + '/obra/' + item.id};
                });

                return barrio;
            });

            return h
                .response({barrios: jsonDatastore.barrios})
                .code(200);
        }
    },
    {
        method: 'GET',
        path: '/barrio/{nombreBarrio}',
        handler: (request, h) => {
            if (request.params.nombreBarrio) {
                const nombreBarrio = request.params.nombreBarrio;
                const resultados = jsonDatastore
                    .filtrarPorCampoString(jsonDatastore.barrios, 'barrio', nombreBarrio);

                if(resultados.length > 0) {
                    return h
                        .response({barrios: resultados})
                        .code(200);
                } else {
                    h.response().code(404);
                }

            } else {
                return h
                    .response({error: true, message: 'Falta nombreBarrio'})
                    .code(400);
            }

        }
    },
    {
        method: 'GET',
        path: '/biblioteca',
        handler: (request, h) => {
            const url = 'http://' + request.info.host;

            const resultados = jsonDatastore.bibliotecas.map((item) => {
                const barrio = jsonDatastore
                    .filtrarPorCampoString(jsonDatastore.barrios, 'barrio', item.barrio)
                    .pop();

                item.barrioLink = [{
                    barrio: url + '/barrio/' + barrio.barrio.toLowerCase(),
                }];

                return item;
            });

            return h
                .response({biblioteca: resultados})
                .code(200);
        }
    },
    {
        method: 'GET',
        path: '/biblioteca/{nombreBiblioteca}',
        handler: (request, h) => {
            if (request.params.nombreBiblioteca) {
                const url = 'http://' + request.info.host + '/';
                const nombreBiblioteca = request.params.nombreBiblioteca;
                const resultados = jsonDatastore
                    .filtrarPorCampoString(jsonDatastore.bibliotecas, 'biblioteca', nombreBiblioteca)
                    .map((item) => {
                        const barrio = jsonDatastore
                            .filtrarPorCampoString(jsonDatastore.barrios, 'barrio', item.barrio)
                            .pop();

                        item.barrioLink = [{
                            barrio: url + 'barrio/' + barrio.barrio.toLowerCase(),
                        }];

                        return item;
                    })

                if(resultados.length > 0) {
                    return h
                        .response({bibliotecas: resultados})
                        .code(200);
                } else {
                    h.response().code(404);
                }

            } else {
                return h
                    .response({error: true, message: 'Falta nombreBiblioteca'})
                    .code(400);
            }

        }
    },
    {
        method: 'GET',
        path: '/obra',
        handler: (request, h) => {

            const resultados =  jsonDatastore.obras.map((item) => {
                const url = 'http://' + request.info.host + '/';
                const barrio = jsonDatastore.filtrarPorCampoString(
                    jsonDatastore.barrios, 'barrio', item.barrio).pop();

                if(typeof barrio !== "undefined") {
                    item.barrioLink = [{
                        barrio: url + '/barrio/' + barrio.barrio.toLowerCase()
                    }];
                }

                return item;
            });

            return h
                .response({obras: resultados})
                .code(200);
        }
    },
    {
        method: 'GET',
        path: '/obra/{idObra}',
        handler: (request, h) => {
            if (request.params.idObra) {
                const url = 'http://' + request.info.host;
                const idObra = parseInt(request.params.idObra);

                const resultados = jsonDatastore
                    .filtrarPorCampoNumero(jsonDatastore.obras, 'id', idObra)
                    .map((item) => {

                        const barrio = jsonDatastore.filtrarPorCampoString(
                            jsonDatastore.barrios, 'barrio', item.barrio).pop();

                        if(typeof barrio !== "undefined") {
                            item.barrioLink = [{
                                barrio: url + '/barrio/' + barrio.barrio.toLowerCase()
                            }];
                        }

                        return item;
                    });

                if(resultados.length > 0) {
                    return h
                        .response({obras: resultados})
                        .code(200);
                } else {
                    return h.response().code(404);
                }

            } else {
                return h
                    .response({error: true, message: 'Falta idObra'})
                    .code(400);
            }
        }
    },
];
