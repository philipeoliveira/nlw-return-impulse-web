import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

// configs geradas no mailtrap
const transport = nodemailer.createTransport({
   host: 'smtp.mailtrap.io',
   port: 2525,
   auth: {
      user: 'f24d0b2305de7c',
      pass: '74b9c65ea7bbb5',
   },
});

export class NodemailerMailAdapter implements MailAdapter {
   async sendMail({ subject, body }: SendMailData) {
      // enviando as informações
      await transport.sendMail({
         from: 'Equipe Feedget <contato@feedget.com>',
         to: 'Philipe Oliveira <philipeoliveira.ti@gmail.com>',
         subject,
         html: body,
      });
   }
}
