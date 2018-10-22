const ds = require('json-data-store');
const db = ds.database();


module.exports = [
    {
        method: 'GET',
        path: '/barrio',
        handler: (request, h) => {
            const barrios = db.get('barrios').value();
            const barriosArray = typeof barrios === 'object' ? [barrios] : barrios;
            return h
                .response({barrios: barriosArray})
                .code(200);
        }
    },
    {
        method: 'GET',
        path: '/barrio/{nombreBarrio}',
        handler: (request, h) => {
            if (request.params.nombreBarrio) {
                const nombreBarrio = request.params.nombreBarrio;
                const resultados = db.get('barrios')
                    .find({barrio: nombreBarrio}).value();

                if(typeof resultados !== 'undefined') {
                    const resultadosArray = typeof resultados === 'object' ? [resultados] : resultados;
                    return h
                        .response({barrios: resultadosArray})
                        .code(200);
                } else {
                    return h.response().code(404);
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
        path: '/obra',
        handler: (request, h) => {
            const obras = db.get('obras').value();
            const obrasArray = typeof obras === 'object' ? [obras] : obras;
            return h
                .response({obras: obrasArray})
                .code(200);
        }
    },
    {
        method: 'GET',
        path: '/obra/{idObra}',
        handler: (request, h) => {
            if (request.params.idObra) {
                const idObra = parseInt(request.params.idObra);
                const resultados = db.get('obras').find({id: idObra}).value();

                if(typeof resultados !== 'undefined') {
                    const resultadosArray = typeof resultados === 'object' ? [resultados] : resultados;
                    return h
                        .response({obras: resultadosArray})
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
