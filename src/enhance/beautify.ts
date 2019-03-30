import { js_beautify } from "js-beautify";
import { defaults } from "lodash";

const DEFAULT_BEAUTIFY_OPTIONS: JsBeautifyOptions = {
  indent_size: 4,
  max_preserve_newlines: 2
};

export type BeautifyOptions = JsBeautifyOptions;

export function beautifyCode(
  beautify: boolean,
  source: string,
  options: BeautifyOptions = {}
): string {
  // Backwards compatible js_beautify
  if (beautify) {
    return js_beautify(source, defaults(options, DEFAULT_BEAUTIFY_OPTIONS));
  }

  // Return original source if no beautify option was given
  return source;
}
