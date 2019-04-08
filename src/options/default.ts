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
    methodSignature: join(DEFAULT_TEMPLATE_PATH, "methodSignature.hbs"),
    type: join(DEFAULT_TEMPLATE_PATH, "type.hbs"),
    interface: join(DEFAULT_TEMPLATE_PATH, "interface.hbs"),
    parameter: join(DEFAULT_TEMPLATE_PATH, "parameter.hbs"),
    jsdoc: join(DEFAULT_TEMPLATE_PATH, "jsdoc.hbs")
  },
  formatCode: true,
  hbsContext: {},
  prettierOptions: {},
  getNamespace(tag: string): string {
    return getNamespace(tag);
  },
  getMethodName(op: HttpOperation, httpVerb: string, path: string): string {
    return op.operationId
      ? normalizeName(op.operationId)
      : getPathToMethodName(httpVerb, path);
  }
};

export const PREDEFINED_TEMPLATES = Object.keys(DEFAULT_OPTIONS.template);
