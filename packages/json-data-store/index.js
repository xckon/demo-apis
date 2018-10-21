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

const barriosRaw = getJSONNFileParsed('barrios.json');
const bibliotecasRaw = getJSONNFileParsed('bibliotecas.json');
const obrasRaw = getJSONNFileParsed('ba-obras.json');

module.exports = {
    barrios: barriosRaw.data.map(cleanupWKT),
    bibliotecas: bibliotecasRaw.data,
    obras: obrasRaw.data,
    filtrarPorCampoString: (dataStore, pkField, matchingKey) => {
        const lowerCaseMatchingKey = matchingKey.toLowerCase();
        return dataStore.filter((item) => {
            return item[pkField].toLowerCase() == lowerCaseMatchingKey;
        })
    },
    filtrarPorCampoNumero: (dataStore, pkField, matchingKey) => {
        return dataStore.filter((item) => {
            return item[pkField] == matchingKey;
        })
    },
}
