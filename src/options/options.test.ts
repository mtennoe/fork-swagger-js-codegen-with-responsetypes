import { makeOptions } from "./options";
import { Swagger } from "../swagger/Swagger";
import { PREDEFINED_TEMPLATES } from "./default";

describe("makeOptions", () => {
  it("merges provided templates", () => {
    const partialOptions = {
      swagger: {} as Swagger,
      template: {
        myExtraTemplate: "C://template.hbs"
      }
    };

    const options = makeOptions(partialOptions);

    expect(Object.keys(options.template).length).toBe(
      PREDEFINED_TEMPLATES.length + 1
    );
  });
});
