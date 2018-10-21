const jsonDatastore = require('json-data-store');

module.exports = [
    {
        method: 'GET',
        path: '/barrio',
        handler: (request, h) => {
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
            return h
                .response({biblioteca: jsonDatastore.bibliotecas})
                .code(200);
        }
    },
    {
        method: 'GET',
        path: '/biblioteca/{nombreBiblioteca}',
        handler: (request, h) => {
            if (request.params.nombreBiblioteca) {
                const nombreBiblioteca = request.params.nombreBiblioteca;
                const resultados = jsonDatastore
                    .filtrarPorCampoString(jsonDatastore.bibliotecas, 'biblioteca', nombreBiblioteca);

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
            return h
                .response({obras: jsonDatastore.obras})
                .code(200);
        }
    },
    {
        method: 'GET',
        path: '/obra/{idObra}',
        handler: (request, h) => {
            if (request.params.idObra) {
                const idObra = parseInt(request.params.idObra);
                const resultados = jsonDatastore
                    .filtrarPorCampoNumero(jsonDatastore.obras, 'id', idObra);

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
