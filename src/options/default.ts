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
  template: {
    class: join(DEFAULT_TEMPLATE_PATH, "class.hbs"),
    method: join(DEFAULT_TEMPLATE_PATH, "method.hbs"),
    type: join(DEFAULT_TEMPLATE_PATH, "type.hbs"),
    interface: join(DEFAULT_TEMPLATE_PATH, "interface.hbs")
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
