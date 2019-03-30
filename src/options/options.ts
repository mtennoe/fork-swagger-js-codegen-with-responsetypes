import { Swagger } from "../swagger/Swagger";
import { join } from "path";

export interface TemplateLocations {
  readonly class: string;
  readonly method: string;
  readonly type: string;
  readonly interface: string;
}

interface Options {
  readonly isES6: boolean;
  readonly imports: ReadonlyArray<string>;
  readonly template: TemplateLocations;
  readonly beautify: boolean;
  readonly hbsContext: any;
  readonly beautifyOptions: JsBeautifyOptions;
}

interface SwaggerOption {
  readonly swagger: Swagger;
}

export const DEFAULT_TEMPLATE_PATH = join(__dirname, "..", "..", "templates");

const DEFAULT_OPTIONS: Options = {
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
  beautifyOptions: {}
};

// This is the internal interface we use to reference to the full Options object with defaults
export interface CodeGenOptions extends Options, SwaggerOption {}

export interface ProvidedCodeGenOptions
  extends Partial<Options>,
    SwaggerOption {}

export function makeOptions(options: ProvidedCodeGenOptions): CodeGenOptions {
  return {
    ...DEFAULT_OPTIONS,
    ...options,
    template: {
      ...DEFAULT_OPTIONS.template,
      ...options.template
    }
  };
}
