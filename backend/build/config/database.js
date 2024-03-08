"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
require("dotenv/config");
exports.databaseConfig = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3308,
    type: process.env.DB_TYPE || 'mysql',
    useSync: process.env.DB_SYNC !== 'false',
};
