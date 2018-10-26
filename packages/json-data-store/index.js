const fs = require('fs');
const path = require('path');

const getJSONNFileParsed = (fileName) => {
    const filePath = path.resolve(__dirname, fileName);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

const cleanupWKT = (item) => {
    delete item.WKT;
    return item;
}

const low = require('lowdb')
const Memory = require('lowdb/adapters/Memory')

const db = low(new Memory());
db.defaults({
    barrios: [],
    obras: [],
}).write();

const barrios = getJSONNFileParsed('barrios.json').data.map(cleanupWKT);
for(let i = 0; i < barrios.length; i++) {
    db.get('barrios').push(barrios[i]).write();
}

const obras = getJSONNFileParsed('ba-obras.json').data;
let obrasAutoIncrementSeed = 0;
for(let i = 0; i < obras.length; i++) {
    obras[i].barrio = obras[i].barrio.toUpperCase();
    db.get('obras').push(obras[i]).write();

    if(obras[i].id > obrasAutoIncrementSeed) {
        obrasAutoIncrementSeed = obras[i].id;
    }
}

module.exports = {
    database: () => {
        return db;
    },

    getBarriosConRelaciones: (url, barrios) => {
        return barrios.map((barrio) => {
            const bibliotecas = db.get('bibliotecas')
                .find({barrio: barrio.barrio}).value();

            const obras = db.get('obras')
                .find({barrio: barrio.barrio}).value();

            barrio.bibliotecas = [];
            if(typeof bibliotecas !== 'undefined') {
                const bibliotecasArray = typeof bibliotecas === 'object' ? [bibliotecas] : bibliotecas;
                barrio.bibliotecas = bibliotecasArray.map((item) => {
                    return {biblioteca: url + '/biblioteca/' + item.biblioteca};
                });
            }

            barrio.obras = [];
            if(typeof obras !== 'undefined') {
                const obrasArray = typeof obras === 'object' ? [obras] : obras;
                barrio.obras = obrasArray.map((item) => {
                    return {obra: url + '/obra/' + item.id};
                });
            }

            return barrio;
        });
    },

    getObrasConRelaciones: (url, obras) => {
        return obras.map((obra) => {
            const barrio = db.get('barrios').find({barrio: obra.barrio}).value()

            obra.barrioLink = [];
            if(typeof barrio !== "undefined") {
                obra.barrioLink = [{
                    barrio: url + '/barrio/' + barrio.barrio
                }];
            }

            return obra;
        });
    },

    getNewObrasIdSeed: () => {
        obrasAutoIncrementSeed++;
        return obrasAutoIncrementSeed;
    }
}
