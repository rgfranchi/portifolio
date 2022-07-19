import {
  fileBase64_decode,
  fileBase64_encode,
  fileBase64_to_ReadStream,
} from "../fileConverter";

const base64 =
  "QktQIEJJSUxPRzoKMS4gbXlzcWxkdW1wIC11YmlpbG9nIC1wIC1obXlzcWwwMS5iaWlsb2cuY29tLmJyIC0tZGF0YWJhc2VzIGJpaWxvZyA+IH4vRG93bmxvYWRzL1lZWVlNTUREX0JpaWxvZ19iYWNrdXAuc3FsCjIuIHBhc3N3b3JkOiB0ZXN0YW5kbwoKRE9DS0VSIE1ZU1FMOgovLyBkb2NrZXIgZXhlYyAtaXQgPENPTlRBSU5FUl9JRD4gbXlzcWwKLy8gZG9ja2VyIGV4ZWMgLWkgPENPTlRBSU5FUl9JRD4gbXlzcWwgLXVyb290IC1wcm9vdCAgPCB+L0Rvd25sb2Fkcy9ZWVlZTU1ERF9CaWlsb2dfYmFja3VwLnNxbApkb2NrZXIgZXhlYyAtaSA5YzA1MDBjMjZmYzAgbXlzcWwgLXVyb290IC1wcm9vdCAgPCB+L0Rvd25sb2Fkcy8KCg==";

describe("Conversores de arquivo", () => {
  test("Converte Base64String para Arquivo", async () => {
    const res = fileBase64_decode(base64, "testFileCreateFromBase64.txt");
    console.log("FILE DECODE:", res);
    expect(res).not.toBeUndefined();
  });

  test("Converte Base64String para Read Stream", async () => {
    const res = fileBase64_to_ReadStream(
      base64,
      "testFileCreateFromBase64.txt"
    );
    console.log("FILE DECODE TO READ STREAM:", res);
    expect(res).not.toBeUndefined();
  });

  test("Converte Arquivo para Base64String", async () => {
    const res = fileBase64_encode("testFileCreateFromBase64.txt");
    console.log("FILE ENCODE:", res);
    expect(res).not.toBeUndefined();
  });
});
