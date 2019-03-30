import { readFileSync } from "fs";
import * as Handlebars from "handlebars";
import { assign } from "lodash";
import { TemplateLocations } from "../options/options";
import * as hbsHelper from "handlebars-helpers";

hbsHelper(["comparison", "collection", "array"]);

Handlebars.registerHelper("times", function(n, block) {
  let accum = "";
  for (let i = 0; i < n; ++i) {
    block.data.index = i;
    block.data.first = i === 0;
    block.data.last = i === n - 1;
    // @ts-ignore
    accum += block.fn(this);
  }
  return accum;
});

export type Templates = Record<keyof TemplateLocations, string>;

export function transformToCodeWithMustache<T, C extends {}>(
  data: T,
  templates: TemplateLocations,
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

function loadTemplates(templateLocations: TemplateLocations): Templates {
  return {
    class: readFileSync(templateLocations.class, "utf-8"),
    method: readFileSync(templateLocations.method, "utf-8"),
    type: readFileSync(templateLocations.type, "utf-8"),
    interface: readFileSync(templateLocations.interface, "utf-8")
  };
}
