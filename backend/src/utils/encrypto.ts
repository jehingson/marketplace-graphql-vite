import crypto from 'crypto';

const secretKey = process.env.CRYPTO_SECRET_KEY || '4hv7e32D3njG6nPF7GnGpKJaJW4MNzUB'
const iv = crypto.randomBytes(16)

const getCipher = () =>  crypto.createCipheriv('aes-256-ctr', secretKey, iv)

const getDecipher = (iv) => crypto.createDecipheriv('aes-256-ctr', secretKey, iv);

export const enc = (content) =>  {
  const cipher = getCipher();
  return Buffer.concat([cipher.update(content), cipher.final()]).toString('hex');
}

export const decrypt = (content, iv) => {
  const decipher = getDecipher(Buffer.from(iv, 'hex'));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(content, 'hex')),
    decipher.final(),
  ]);

  return decrypted.toString();
}

export const hash = (content) => crypto.createHash('sha256').update(content).digest('hex').toString();
