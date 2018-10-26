const ds = require('json-data-store');
const db = ds.database();
const _ = require('lodash');

const routesDemo1 = require('demo-1--get');

module.exports = routesDemo1.concat([
    {
        method: 'POST',
        path: '/barrio',
        handler: (request, h) => {
            try {
                let newBarrio = JSON.parse(request.payload);
                const requiredAttrs = ['barrio', 'comuna'];

                const diff = _.difference(requiredAttrs, _.keys(newBarrio));

                if(diff.length === 0 ) {
                    newBarrio.barrio = newBarrio.barrio.toUpperCase();

                    const exists = db.get('barrios')
                        .find({barrio: newBarrio.barrio}).value();

                    if(!exists) {
                        db.get('barrios').push(_.defaults(newBarrio, {
                            perimetro: -1,
                            area: -1,
                            WKT: ''
                        })).write();

                        const result = db.get('barrios')
                            .find({barrio: newBarrio.barrio}).value();

                        return h
                            .response({barrio: result})
                            .code(200);
                    } else {
                        return h
                            .response({error: [{
                                code: 409,
                                title: 'Duplicated Entity',
                                detail: 'El barrio ya existe',
                            }]})
                            .code(409);
                    }
                } else {
                    let errors = [];
                    for(let i = 0; i < diff.length; i++) {
                        errors.push({
                            title: 'Missing Field',
                            detail: diff[i],
                        });
                    }

                    return h
                        .response({error: errors})
                        .code(422);
                }
            } catch(e) {
                return h
                    .response({error: [{
                        code: 400,
                        title: 'Error',
                        details: e.message,
                    }]})
                    .code(400)
            }
        }
    },
    {
        method: 'POST',
        path: '/obra',
        handler: (request, h) => {
            try {
                let newObra = JSON.parse(request.payload);

                const requiredAttrs = [
                    'entorno',
                    'nombre',
                    'etapa',
                    'tipo',
                    'descripcion',
                    'monto_contrato',
                    'comuna',
                    'barrio',
                    'direccion',
                    'fecha_inicio',
                    'plazo_meses',
                    'licitacion_oferta_empresa',
                    'cuit',
                    'licitacion_anio',
                ];

                const diff = _.difference(requiredAttrs, _.keys(newObra));

                if(diff.length === 0 ) {
                    newObra.barrio = newObra.barrio.toUpperCase();

                    const barrioExists = db.get('barrios')
                        .find({barrio: newObra.barrio}).value();

                    if(barrioExists) {
                        const newId = ds.getNewObrasIdSeed();
                        db.get('obras').push(_.defaults(newObra, {
                            id: newId,
                            entorno: '-',
                            nombre: '-',
                            etapa: 'Iniciada',
                            tipo: '-',
                            area_responsable: '-',
                            descripcion: '-',
                            monto_contrato: '-',
                            comuna: '-',
                            barrio: '-',
                            direccion: '-',
                            lat: -34.5671531157142,
                            lng: -58.4792365744249,
                            fecha_inicio: '-',
                            fecha_fin_inicial: '-',
                            plazo_meses: 0,
                            porcentaje_avance: 0,
                            imagen_1: '-',
                            imagen_2: '-',
                            imagen_3: '-',
                            imagen_4: '-',
                            licitacion_oferta_empresa: '',
                            cuit: '',
                            licitacion_anio: (new Date()).getFullYear(),
                            beneficiarios: '-',
                            mano_obra: '-',
                            compromiso: '',
                            link_interno: 'http://google.com',
                            pliego_descarga: 'http://google.com'
                        })).write();

                        const result = db.get('obras')
                            .find({id: newId}).value();

                        return h
                            .response({obra: result})
                            .code(200);
                    } else {
                        return h
                            .response({error: [{
                                code: 412,
                                title: 'Error',
                                details: 'El barrio asociado no existe',
                            }]})
                            // 412 - Precondition Failed ()
                            .code(412); 
                    }
                } else {
                    let errors = [];
                    for(let i = 0; i < diff.length; i++) {
                        errors.push({
                            title: 'Missing Field',
                            detail: diff[i],
                        });
                    }

                    return h
                        .response({error: errors})
                        .code(422);
                }
            } catch(e) {
                return h
                .response({error: [{
                    code: 400,
                    title: 'Error',
                    details: e.message,
                }]})
                .code(400)
            }
        }
    },
]);
