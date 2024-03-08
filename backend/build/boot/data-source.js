"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const models_1 = __importDefault(require("../app/models"));
const database_1 = require("../config/database");
exports.AppDataSource = new typeorm_1.DataSource({
    type: database_1.databaseConfig.type,
    database: database_1.databaseConfig.database,
    username: database_1.databaseConfig.username,
    password: database_1.databaseConfig.password,
    host: database_1.databaseConfig.host,
    port: database_1.databaseConfig.port,
    synchronize: database_1.databaseConfig.useSync,
    entities: models_1.default,
    migrationsRun: false,
});
