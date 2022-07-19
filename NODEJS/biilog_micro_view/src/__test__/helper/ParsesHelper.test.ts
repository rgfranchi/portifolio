import {
  parseAnyToArrayString,
  parseAnyToString,
} from "../../helper/ParsesHelper";

describe("parseAnyToString", () => {
  test("array", () => {
    expect(parseAnyToString({ key1: "value1", key2: "value2" })).toBe(
      '{"key1":"value1","key2":"value2"}'
    );
  });
  test("boolean", () => {
    expect(parseAnyToString(true)).toBe("true");
  });
  test("function", () => {
    expect(parseAnyToString(function nomeFunção() {})).toBe(
      "Function:nomeFunção"
    );
  });
  test("numeric", () => {
    expect(parseAnyToString(147258.369)).toBe("147258.369");
  });
  test("string", () => {
    expect(parseAnyToString("String simples")).toBe("String simples");
  });
  test("undefined", () => {
    expect(parseAnyToString(undefined)).toBe("Mensagem não definida");
  });
  test("null", () => {
    expect(parseAnyToString(null)).toBe("null");
  });
});

describe("parseAnyToArrayString", () => {
  test("array", () => {
    expect(
      parseAnyToArrayString({ key1: "value1", key2: "value2" })
    ).toMatchObject(["key1:value1", "key2:value2"]);
  });
  test("string", () => {
    expect(
      parseAnyToArrayString('"TEXTO":"VALOR 1","TEXTO":"value 2"')
    ).toMatchObject(['"TEXTO":"VALOR 1","TEXTO":"value 2"']);
  });
  test("boolean", () => {
    expect(parseAnyToArrayString(true)).toMatchObject(["true"]);
  });
  test("function", () => {
    expect(parseAnyToArrayString(function nomeFunction() {})).toMatchObject([
      "Function:nomeFunction",
    ]);
  });
  test("number", () => {
    expect(parseAnyToArrayString(147258.369)).toMatchObject(["147258.369"]);
  });
  test("string", () => {
    expect(parseAnyToArrayString("String simples")).toMatchObject([
      "String simples",
    ]);
  });
  test("undefined", () => {
    expect(parseAnyToArrayString(undefined)).toMatchObject([
      "Mensagem não definida",
    ]);
  });
  test("null", () => {
    expect(parseAnyToArrayString(null)).toMatchObject(["null"]);
  });
});
