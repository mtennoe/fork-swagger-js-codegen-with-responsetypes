import { readFileSync } from "fs";
import * as Handlebars from "handlebars";
import { assign } from "lodash";
import { TemplateLocations } from "../options/options";
import { join } from "path";

export const DEFAULT_TEMPLATE_PATH = join(__dirname, "..", "..", "templates");

export type Templates = Record<keyof TemplateLocations, string>;

export function transformToCodeWithMustache<T, C extends {}>(
  data: T,
  templates: Partial<Templates>,
  additionalViewOptions: Partial<C> = {}
): string {
  const loadedTemplates = loadTemplates(templates);

  const compiledMainTemplate = Handlebars.compile(loadedTemplates.class);

  for (const [partialName, template] of Object.entries(loadedTemplates)) {
    if (partialName === "class") continue;
    Handlebars.registerPartial(partialName, template);
  }

  return compiledMainTemplate(assign(data, additionalViewOptions));
}

function loadTemplates(templateLocations: Partial<Templates> = {}): Templates {
  return {
    class:
      templateLocations.class ||
      readFileSync(join(DEFAULT_TEMPLATE_PATH, "class.hbs"), "utf-8"),
    method:
      templateLocations.method ||
      readFileSync(join(DEFAULT_TEMPLATE_PATH, "method.hbs"), "utf-8"),
    type:
      templateLocations.type ||
      readFileSync(join(DEFAULT_TEMPLATE_PATH, "type.hbs"), "utf-8")
  };
}
