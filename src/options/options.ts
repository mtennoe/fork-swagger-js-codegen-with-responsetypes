import * as Mustache from "mustache";
import { isObject, isString } from "lodash";
import { Swagger } from "../swagger/Swagger";

export interface TemplateLocations {
  readonly class: string;
  readonly method: string;
  readonly type: string;
}

interface Options {
  readonly isES6: boolean;
  readonly moduleName: string;
  readonly includeDeprecated: boolean;
  readonly imports: ReadonlyArray<string>;
  readonly className: string;
  readonly template: Partial<TemplateLocations>;
  readonly mustache: typeof Mustache;
  readonly beautify: ((source: string) => string) | boolean;
  readonly beautifyOptions: JsBeautifyOptions;
}

interface SwaggerOption {
  readonly swagger: Swagger;
}

const DEFAULT_OPTIONS: Options = {
  isES6: false,
  moduleName: "",
  includeDeprecated: false,
  imports: [],
  className: "",
  template: {},
  mustache: Mustache,
  beautify: true,
  beautifyOptions: {}
};

// This is the internal interface we use to reference to the full Options object with defaults
export interface CodeGenOptions extends Options, SwaggerOption {}
// All options except the swagger object are optional when passing in options
export interface ProvidedCodeGenOptions
  extends Partial<Options>,
    SwaggerOption {}

export function makeOptions(options: ProvidedCodeGenOptions): CodeGenOptions {
  return {
    ...DEFAULT_OPTIONS,
    ...options
  };
}

/**
 * Validate that the options have required variables for custom generation.
 */
export function validOptions(options: ProvidedCodeGenOptions): void {
  // TODO: Why do we not check for the existence of the type template?
  if (
    !options.template ||
    !isObject(options.template) ||
    !isString(options.template.class) ||
    !isString(options.template.method)
  ) {
    throw new Error(
      'Unprovided custom template. Please use the following template: template: { class: "...", method: "...", request: "..." }'
    );
  }
}
