import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
export interface SMTP {
  config(body: EmailBody): Transporter<SMTPTransport.SentMessageInfo>;
}

export type EmailBody = {
  host: string;
  user: string;
  pass: string;
};

export class NodeMaillerSMTP implements SMTP {
  config(body: EmailBody): Transporter<SMTPTransport.SentMessageInfo> {
    return nodemailer.createTransport({
      host: body.host,
      port: 587,
      secure: false,
      auth: {
        user: body.user,
        pass: body.pass,
      },
    });
  }
}
