import "dotenv/config";
import axios from "axios";
import { Alert } from "./alert";
import { CalculateTimeDistance } from "./calculateTime";

export class Monitor {
  constructor(private readonly alert: Alert) {}

  public async start(): Promise<void> {
    const timeResponseInitial = new Date();
    let timeResponseFinal: Date;
    const dateInitial = new Date();
    let dateFinal: Date;
    try {
      const url = process.env.URL;

      const { data } = await axios({
        method: "GET",
        url,
        data: {},
        timeout: 40000,
      });

      dateFinal = new Date();
      if (!data.length) {
        return await this.alert.fallenApi(dateInitial, dateFinal);
      }

      timeResponseFinal = new Date();
      const calculateTimeDistance = new CalculateTimeDistance();
      const seconds = calculateTimeDistance.timeInSeconds(
        timeResponseInitial,
        timeResponseFinal
      );

      if (seconds >= 30) {
        const info = `Tempo de espera: ${seconds} segundos.`;
        console.log("EMAIL Enviado! Tempo de espera: ", seconds);

        return await this.alert.timeoutApi(dateInitial, dateFinal, info);
      }
      return console.log("API OK! Tempo de espera: ", seconds);
    } catch (error) {
      dateFinal = new Date();
      console.log("EMAIL Enviado!");
      await this.alert.fallenApi(dateInitial, dateFinal);
    }
  }
}
