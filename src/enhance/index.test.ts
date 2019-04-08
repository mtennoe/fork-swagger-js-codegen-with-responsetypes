import { enhanceCode } from "./";
import { beautifyCode } from "./beautify";

jest.mock("./beautify");

describe("enhanceCode", () => {
  it("calls beautify with the correct arguments", () => {
    const code = `function helloWorld(){return'hello world'};`;

    enhanceCode(code, { formatCode: false, prettierOptions: {} });

    expect(beautifyCode).toBeCalledWith(false, code, {});
  });
});
