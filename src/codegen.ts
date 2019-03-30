import {
  CodeGenOptions,
  ProvidedCodeGenOptions,
  makeOptions
} from "./options/options";
import { getViewForSwagger2 } from "./getViewForSwagger2";
import { transformToCodeWithMustache } from "./transform/transformToCodeWithMustache";
import { enhanceCode } from "./enhance";

function getCode(opts: CodeGenOptions): string {
  verifyThatWeAreGeneratingForSwagger2(opts);

  const data = getViewForSwagger2(opts);
  return transformToCodeWithMustache(data, opts.template, opts.hbsContext);
}

export const CodeGen = {
  transformToViewData: getViewForSwagger2,
  transformToCodeWithMustache,
  generateCode: function(opts: ProvidedCodeGenOptions) {
    const options = makeOptions(opts);

    return enhanceCode(getCode(options), options);
  },
  getDataAndOptionsForGeneration: function(opts: ProvidedCodeGenOptions) {
    const options = makeOptions(opts);
    verifyThatWeAreGeneratingForSwagger2(options);
    const data = getViewForSwagger2(options);
    return { data, options };
  }
};

function verifyThatWeAreGeneratingForSwagger2(opts: CodeGenOptions): void {
  if (opts.swagger.swagger !== "2.0") {
    throw new Error("Only Swagger 2 specs are supported");
  }
}
