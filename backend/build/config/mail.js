"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailConfig = void 0;
exports.mailConfig = {
    host: process.env.MAIL_HOST || 'sandbox.smtp.mailtrap.io',
    port: parseInt(process.env.MAIL_PORT) || 2525,
    secure: process.env.MAIL_SECURE ? process.env.MAIL_SECURE === 'true' : false,
    user: process.env.MAIL_USER || '',
    password: process.env.MAIL_PASSWORD || "",
};
