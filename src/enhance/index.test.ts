import { enhanceCode } from "./";
import { beautifyCode } from "./beautify";

jest.mock("./beautify");

describe("enhanceCode", () => {
  it("calls beautify with the correct arguments", () => {
    const code = `function helloWorld(){return'hello world'};`;

    enhanceCode(code, { beautify: false, beautifyOptions: {} });

    expect(beautifyCode).toBeCalledWith(false, code, {});
  });
});
