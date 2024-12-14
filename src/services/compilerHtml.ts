import fs from "fs/promises";
import handlebars from "handlebars";
export interface HTML {
  compiler(input: HtmlInput): Promise<string>;
}

export type HtmlInput = {
  file: string;
  context: {
    date: string;
    time: string;
    title: string;
    description: string;
  };
};

export class HandlebarsHTML implements HTML {
  async compiler(input: HtmlInput): Promise<string> {
    const html = await fs.readFile(input.file);
    const template = handlebars.compile(html.toString());
    return template(input.context);
  }
}
