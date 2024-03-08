"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailer = void 0;
const nodemailer_1 = require("nodemailer");
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const typedi_1 = require("typedi");
const app_1 = require("../config/app");
const mail_1 = require("../config/mail");
let Mailer = class Mailer {
    constructor() {
        this.sendMail = (options) => {
            return this.transport.sendMail(Object.assign(Object.assign({}, options), { context: Object.assign(Object.assign({}, options.context), { app: Object.assign({}, app_1.appConfig) }) }));
        };
        // eslint-disable-next-line no-console
        console.log('Sending email from:', mail_1.mailConfig.user);
        this.transport = (0, nodemailer_1.createTransport)({
            host: mail_1.mailConfig.host,
            port: mail_1.mailConfig.port,
            secure: mail_1.mailConfig.secure,
            auth: {
                user: mail_1.mailConfig.user,
                pass: mail_1.mailConfig.password,
            },
        });
        let templatesPath = path.resolve(process.cwd(), 'src', 'resources', 'views');
        let layoutsPath = path.resolve(process.cwd(), 'src', 'resources', 'views', 'layouts');
        if (!fs.existsSync(templatesPath)) {
            templatesPath = path.resolve(process.cwd(), 'dist', 'resources', 'views');
        }
        if (!fs.existsSync(layoutsPath)) {
            layoutsPath = path.resolve(process.cwd(), 'dist', 'resources', 'views', 'layouts');
        }
        this.transport.use('compile', (0, nodemailer_express_handlebars_1.default)({
            viewEngine: {
                extname: '.hbs',
                layoutsDir: layoutsPath,
            },
            viewPath: templatesPath,
            extName: '.hbs',
        }));
    }
};
exports.Mailer = Mailer;
exports.Mailer = Mailer = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], Mailer);
