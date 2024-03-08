"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = exports.decrypt = exports.enc = void 0;
const crypto_1 = __importDefault(require("crypto"));
const secretKey = process.env.CRYPTO_SECRET_KEY || '4hv7e32D3njG6nPF7GnGpKJaJW4MNzUB';
const iv = crypto_1.default.randomBytes(16);
const getCipher = () => crypto_1.default.createCipheriv('aes-256-ctr', secretKey, iv);
const getDecipher = (iv) => crypto_1.default.createDecipheriv('aes-256-ctr', secretKey, iv);
const enc = (content) => {
    const cipher = getCipher();
    return Buffer.concat([cipher.update(content), cipher.final()]).toString('hex');
};
exports.enc = enc;
const decrypt = (content, iv) => {
    const decipher = getDecipher(Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(content, 'hex')),
        decipher.final(),
    ]);
    return decrypted.toString();
};
exports.decrypt = decrypt;
const hash = (content) => crypto_1.default.createHash('sha256').update(content).digest('hex').toString();
exports.hash = hash;
