export const mailConfig = {
  host: process.env.MAIL_HOST || 'sandbox.smtp.mailtrap.io',
  port: parseInt(process.env.MAIL_PORT) || 2525,
  secure: process.env.MAIL_SECURE ? process.env.MAIL_SECURE === 'true' : false,
  user: process.env.MAIL_USER || 'bea51e38cb5b5a',
  password: process.env.MAIL_PASSWORD || "fd818ac8c6ae57",
};
