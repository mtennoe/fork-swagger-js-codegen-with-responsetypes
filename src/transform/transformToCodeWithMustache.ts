import { readFileSync } from "fs";
import * as Handlebars from "handlebars";
import { assign } from "lodash";
import { TemplateLocations } from "../options/options";
import * as hbsHelper from "handlebars-helpers";
import { isAbsolute } from "path";

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

Handlebars.registerHelper("concat", (...args) => args.slice(0, -1).join(""));

export type Templates = Record<keyof TemplateLocations, string>;

export function transformToCodeWithMustache<T, C extends {}>(
  data: T,
  templates: TemplateLocations,
  additionalViewOptions: Partial<C> = {}
): string {
  const loadedTemplates = loadTemplates(templates);

  const compiledMainTemplate = Handlebars.compile(loadedTemplates.main, {
    noEscape: true
  });

  for (const [partialName, template] of Object.entries(loadedTemplates)) {
    if (partialName === "main") continue;
    Handlebars.registerPartial(partialName, template);
  }

  return compiledMainTemplate(assign(data, additionalViewOptions));
}

function loadTemplates(templateLocations: TemplateLocations): Templates {
  const PREDEFINED_TEMPLATES = ["main", "method", "type", "interface"];
  const customTemplates: Templates = {};

  for (const templateName in templateLocations) {
    if (PREDEFINED_TEMPLATES.indexOf(templateName) > -1) continue;
    customTemplates[templateName] = loadTemplate(
      templateLocations[templateName]
    );
  }

  return {
    main: loadTemplate(templateLocations.main),
    method: loadTemplate(templateLocations.method),
    type: loadTemplate(templateLocations.type),
    interface: loadTemplate(templateLocations.interface),
    ...customTemplates
  };
}

function loadTemplate(path: string): string {
  if (!isAbsolute(path)) throw new Error("Template path must be absolute");
  return readFileSync(path, "utf-8");
}
