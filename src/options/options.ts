import { HttpOperation, Swagger } from "../swagger/Swagger";
import { DEFAULT_OPTIONS } from "./default";

export interface TemplateLocationsOptional extends Partial<TemplateLocations> {}

export interface TemplateLocations {
  readonly main: string;
  readonly method: string;
  readonly methodSignature: string;
  readonly type: string;
  readonly interface: string;
  readonly parameter: string;
  readonly jsdoc: string;
  readonly [key: string]: string;
}

export interface Options {
  readonly isES6: boolean;
  readonly includeDeprecated: boolean;
  readonly imports: ReadonlyArray<string>;
  readonly template: TemplateLocationsOptional;
  readonly beautify: boolean;
  readonly hbsContext: any;
  readonly beautifyOptions: JsBeautifyOptions;
  getNamespace(tag: string): string;
  getMethodName(op: HttpOperation, httpVerb: string, path: string): string;
}

interface SwaggerOption {
  readonly swagger: Swagger;
}

// This is the internal interface we use to reference to the full Options object with defaults
export interface CodeGenOptions extends Options, SwaggerOption {
  readonly template: TemplateLocations;
}

export interface ProvidedCodeGenOptions
  extends Partial<Options>,
    SwaggerOption {}

export function makeOptions(options: ProvidedCodeGenOptions): CodeGenOptions {
  return {
    ...DEFAULT_OPTIONS,
    ...options,
    // @ts-ignore
    template: {
      ...DEFAULT_OPTIONS.template,
      ...options.template
    }
  };
}
