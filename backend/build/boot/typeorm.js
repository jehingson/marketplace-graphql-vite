"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDb = void 0;
const data_source_1 = require("./data-source");
const initializeDb = () => {
    data_source_1.AppDataSource.initialize()
        .then(() => console.log('conection DB'))
        .catch((error) => console.log(error));
};
exports.initializeDb = initializeDb;
