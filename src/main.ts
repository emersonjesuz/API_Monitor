import cors from "cors";
import { CronJob } from "cron";
import express, { Request, response, Response } from "express";
import { Alert } from "./alert";
import { Monitor } from "./monitor";
import { HandlebarsHTML } from "./services/compilerHtml";
import { EmailGoogle } from "./services/email";
import { NodeMaillerSMTP } from "./services/smtp";
const app = express();
app.use(cors());
app.use(express.json());
const smtp = new NodeMaillerSMTP();
const html = new HandlebarsHTML();
const email = new EmailGoogle(smtp, html);
const alert = new Alert(email);
const monitor = new Monitor(alert);

app.get("/monitor", (req: Request, res: Response) => {
  monitor.start();
  console.log("Finalizado!");
  res.send();
});

app.listen(3000, () => console.log("Server started on port 3000"));

const job = new CronJob("*/5 * * * *", async () => {
  console.log("Executando...");
  await monitor.start();
});
job.start();
