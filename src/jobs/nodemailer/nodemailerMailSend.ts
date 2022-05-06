import { MailSend, SendMailData } from "../mailSend";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d0b9bc9dba4c0e",
      pass: "a3df7e43bfba17"
    }
  });

export class NodemailerMailSend implements MailSend {
    async sendMail({ subject, body }: SendMailData){  
    await transport.sendMail({
        from: 'Feedback <naoresponda@hotmail.com>',
        to: 'Igor Lacerda Santos <igorlacerdasantos@hotmail.com>',
        subject,
        html: body
        })
    }
}