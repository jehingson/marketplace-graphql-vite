import { createTransport, SendMailOptions, Transporter } from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import * as path from 'path';
import * as fs from 'fs';
import { Service } from 'typedi';
import { appConfig } from '../config/app';
import { mailConfig } from '../config/mail';

@Service()
export class Mailer {
  transport: Transporter;

  constructor() {
    // eslint-disable-next-line no-console
    console.log('Sending email from:', mailConfig.user);

    this.transport = createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: mailConfig.secure,
      auth: {
        user: mailConfig.user,
        pass: mailConfig.password,
      },
    } as any);

    let templatesPath = path.resolve(
      process.cwd(),
      'src',
      'resources',
      'views'
    );

    let layoutsPath = path.resolve(
      process.cwd(),
      'src',
      'resources',
      'views',
      'layouts'
    );

    if (!fs.existsSync(templatesPath)) {
      templatesPath = path.resolve(process.cwd(), 'dist', 'resources', 'views');
    }

    if (!fs.existsSync(layoutsPath)) {
      layoutsPath = path.resolve(
        process.cwd(),
        'dist',
        'resources',
        'views',
        'layouts'
      );
    }

    this.transport.use(
      'compile',
      hbs({
        viewEngine: {
          extname: '.hbs',
          layoutsDir: layoutsPath,
        },
        viewPath: templatesPath,
        extName: '.hbs',
      })
    );
  }

  sendMail = (
    options: SendMailOptions & { template: string; context: any }
  ) => {
    return this.transport.sendMail({
      ...options,
      context: {
        ...options.context,
        app: {
          ...appConfig,
        },
      },
    } as any);
  };
}
