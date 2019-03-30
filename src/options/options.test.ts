import { makeOptions } from "./options";
import { Swagger } from "../swagger/Swagger";

describe("makeOptions", () => {
  it("merges provided templates", () => {
    const partialOptions = {
      swagger: {} as Swagger,
      template: {
        myExtraTemplate: "C://template.hbs"
      }
    };

    const options = makeOptions(partialOptions);

    expect(Object.keys(options.template).length).toBe(5);
  });
});
