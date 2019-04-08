import { beautifyCode, BeautifyOptions } from "./beautify";

export interface EnhanceOptions {
  formatCode: boolean;
  prettierOptions: BeautifyOptions;
}

export function enhanceCode(source: string, opts: EnhanceOptions): string {
  return beautifyCode(opts.formatCode, source, opts.prettierOptions);
}
