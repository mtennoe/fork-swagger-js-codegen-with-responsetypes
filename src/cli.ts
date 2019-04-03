import * as fs from "fs";
import * as cli from "commander";

import * as path from "path";
import { CodeGen } from "./codegen";

const pkg = require("../package.json");

cli
  .command("generate <file>")
  .description("Generate from Swagger file")
  .option("-o, --out [outFile]", "Output file")
  .action((file: string, options: any) => {
    const result = CodeGen.generateCode({
      swagger: JSON.parse(fs.readFileSync(file, "utf-8"))
    });
    const outFileName = options.out ? options.out : "./api.ts";
    const outFilePath = path.join(process.cwd(), outFileName);
    fs.writeFileSync(outFilePath, result, { encoding: "UTF-8" });
  });

cli.version(pkg.version);
cli.parse(process.argv);

if (!cli.args.length) {
  cli.help();
}
