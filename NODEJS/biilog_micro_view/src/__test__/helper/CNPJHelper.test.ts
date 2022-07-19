import { CNPJValidate } from "../../helper/CNPJHelper";

describe("", () => {
  test("validate", () => {
    expect(CNPJValidate("58.959.388/0001-32")).toBe(true);
  });
});

describe("CNPJValidade invalid", () => {
  test("empty", () => {
    expect(CNPJValidate("")).toBe(false);
  });
  test("undefined", () => {
    expect(CNPJValidate(undefined)).toBe(false);
  });
  test("equals values", () => {
    expect(CNPJValidate("44.444.444/4444-44")).toBe(false);
  });
  test("mask", () => {
    expect(CNPJValidate("58.959.388/0001-3")).toBe(false);
  });
  test("number", () => {
    expect(CNPJValidate("58.959.388/0001-31")).toBe(false);
  });
});
