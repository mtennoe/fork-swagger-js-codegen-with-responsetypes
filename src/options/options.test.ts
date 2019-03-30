import { makeOptions } from "./options";
import * as Mustache from "mustache";
import { Swagger } from "../swagger/Swagger";

const defaultOptions = {
  isES6: false,
  moduleName: "",
  imports: [],
  className: "",
  template: {},
  mustache: Mustache,
  beautify: true,
  beautifyOptions: {}
};

describe("makeOptions", () => {
  it("returns the default options when no options are passed", () => {
    const partialOptions = {
      swagger: {} as Swagger
    };

    expect(makeOptions(partialOptions)).toEqual({
      ...defaultOptions,
      swagger: {}
    });
  });

  it("merges provided templates", () => {
    const partialOptions = {
      swagger: {} as Swagger,
      template: {
        myExtraTemplate: "C://template.hbs"
      }
    };

    const options = makeOptions(partialOptions);

    expect(options.template.length).toBe(5);
  });
});
