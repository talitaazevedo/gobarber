// Configuração de coisas adicionais referente ao email
import nodemailer from 'nodemailer';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import mailConfig from '../config/mail';

class Mail {
    constructor() {
        const { host, port, secure, auth } = mailConfig;
        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: auth.user ? auth : null,
        });
        // chama o metodo criado
        this.configureTemplates();
    }

    configureTemplates() {
        const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');
        // como ele compila nossos emails age em cima do nodemailer
        this.transporter.use(
            'compile',
            nodemailerhbs({
                // primeira configuração do compile
                viewEngine: exphbs.create({
                    // usa o path  para resolver o caminho
                    layoutsDir: resolve(viewPath, 'layouts'),
                    partialsDir: resolve(viewPath, 'partials'),
                    // aqui o nome do layout que vou usar
                    defaultLayout: 'default',

                    // nome da extensão

                    extname: '.hbs',
                }),
                viewPath,
                extName: '.hbs',
            })
        );
    }

    sendMail(message) {
        return this.transporter.sendMail({
            ...mailConfig.default,
            ...message,
        });
    }
}

export default new Mail();
