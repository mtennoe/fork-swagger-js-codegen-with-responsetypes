import { join } from "path";
import { Options } from "./options";
import {
  getPathToMethodName,
  normalizeName,
  getNamespace
} from "../view-data/method";
import { HttpOperation } from "../swagger/Swagger";

const DEFAULT_TEMPLATE_PATH = join(__dirname, "..", "..", "templates");

export const DEFAULT_OPTIONS: Options = {
  isES6: false,
  imports: [],
  includeDeprecated: false,
  template: {
    main: join(DEFAULT_TEMPLATE_PATH, "main.hbs"),
    method: join(DEFAULT_TEMPLATE_PATH, "method.hbs"),
    type: join(DEFAULT_TEMPLATE_PATH, "type.hbs"),
    interface: join(DEFAULT_TEMPLATE_PATH, "interface.hbs"),
    parameter: join(DEFAULT_TEMPLATE_PATH, "parameter.hbs")
  },
  beautify: true,
  hbsContext: {},
  beautifyOptions: {},
  getNamespace(tag: string): string {
    return getNamespace(tag);
  },
  getMethodName(op: HttpOperation, httpVerb: string, path: string): string {
    return op.operationId
      ? normalizeName(op.operationId)
      : getPathToMethodName(httpVerb, path);
  }
};
