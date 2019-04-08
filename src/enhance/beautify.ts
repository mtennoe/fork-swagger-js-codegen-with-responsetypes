import { defaults } from "lodash";
import { format, Options } from "prettier";

const DEFAULT_PRETTIER_OPTIONS: Options = {
  parser: "typescript",
  tabWidth: 4,
  useTabs: false,
  singleQuote: true
};

export type BeautifyOptions = Options;

export function beautifyCode(
  formatCode: boolean,
  source: string,
  options: BeautifyOptions = {}
): string {
  if (formatCode) {
    return format(source, defaults(options, DEFAULT_PRETTIER_OPTIONS));
  }
  return source;
}
