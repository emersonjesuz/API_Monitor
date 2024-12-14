import { Email } from "./services/email";

export class Alert {
  constructor(private readonly email: Email) {}
  async fallenApi(initial: Date, final: Date) {
    return await this.email.send({
      to: ["josiemerson2013@gmail.com"],
      subject: "API CAIU!",
      body: {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        title: "API CAIU!",
        description: `
              Ouve algum problema com a API!
              
              chamada feita em: ${new Date().toLocaleDateString()}
              tempo de inicio: ${initial.toLocaleTimeString()}
              tempo de finalização: ${final.toLocaleTimeString()}
              `,
      },
    });
  }

  async timeoutApi(initial: Date, final: Date, info?: string) {
    return await this.email.send({
      to: ["josiemerson2013@gmail.com"],
      subject: "API LENTA!",
      body: {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        title: "API esta muito lenta!",
        description: `
              Ouve algum problema com a API!
              
              chamada feita em: ${new Date().toLocaleDateString()}
              tempo de inicio: ${initial.toLocaleTimeString()}
              tempo de finalização: ${final.toLocaleTimeString()}

              ${info}
              `,
      },
    });
  }
}
