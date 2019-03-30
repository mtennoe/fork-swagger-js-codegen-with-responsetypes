import { CodeGen } from "./codegen";
import { Swagger } from "./swagger/Swagger";

describe("CodeGen", () => {
  let swagger = {
    swagger: "2.0"
  } as Swagger;

  describe("getTypescriptCode", () => {
    it("throws when the swagger version is not 2.0", () => {
      swagger = {
        ...swagger,
        swagger: "3.0"
      };

      expect(() => CodeGen.generateCode({ swagger })).toThrow(
        "Only Swagger 2 specs are supported"
      );
    });
  });

  describe("getCustomCode", () => {
    it("throws when the swagger version is not 2.0", () => {
      const customTemplates = {
        class: "class <className> {<classContent>}",
        method: "function <methodName>() {<methodContent}}"
      };

      swagger = {
        ...swagger,
        swagger: "3.0"
      };

      expect(() =>
        CodeGen.generateCode({ swagger, template: customTemplates })
      ).toThrow("Only Swagger 2 specs are supported");
    });
  });
});
