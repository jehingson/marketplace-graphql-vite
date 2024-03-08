"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
exports.appConfig = {
    name: process.env.NAME,
    shortName: process.env.SHORT_NAME,
    multipleLogin: process.env.MULTIPLE_LOGIN === 'true',
    https: process.env.HTTPS === 'true',
    secret: process.env.SECRET_KEY,
};
