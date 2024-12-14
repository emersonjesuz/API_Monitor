import "dotenv/config";
import { HTML } from "./compilerHtml";
import { SMTP } from "./smtp";

export interface Email {
  smtp: SMTP;
  html: HTML;
  send(input: EmailInput): Promise<void>;
}

export type EmailInput = {
  to: string[];
  subject: string;
  body: {
    date: string;
    time: string;
    title: string;
    description: string;
  };
};
export class EmailGoogle implements Email {
  smtp: SMTP;
  html: HTML;
  constructor(smtp: SMTP, html: HTML) {
    this.smtp = smtp;
    this.html = html;
  }
  async send(input: EmailInput): Promise<void> {
    try {
      const compilador = await this.html.compiler({
        file: "./src/templates/fallen_api.html",
        context: {
          date: input.body.date,
          time: input.body.time,
          title: input.body.title,
          description: input.body.description,
        },
      });
      const email = await this.smtp.config({
        host: process.env.SMTP_HOST || "",
        user: process.env.SMTP_EMAIL || "",
        pass: process.env.SMTP_PASSWORD || "",
      });

      email.sendMail({
        from: `Monitoramento API <${process.env.SMTP_EMAIL}>`,
        to: input.to,
        subject: input.subject,
        html: compilador,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
