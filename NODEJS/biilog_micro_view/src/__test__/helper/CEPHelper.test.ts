import { findCEP } from "../../helper/CEPHelper";

describe("CEPHelper valido", () => {
  test("findCEP", async () => {
    const resp = await findCEP("05520-200");
    expect(200).toEqual(resp.status);
    expect({
      cep: "05520-200",
      logradouro: "Avenida Professor Francisco Morato",
      complemento: "de 4232 a 4886 - lado par",
      bairro: "Vila Sônia",
      localidade: "São Paulo",
      uf: "SP",
      ibge: "3550308",
      gia: "1004",
      ddd: "11",
      siafi: "7107",
    }).toEqual(resp.response);
  });
});

describe("CEPHelper invalido", () => {
  test("findCEP not found", async () => {
    const resp = await findCEP("00000-999");
    expect(resp.status).toEqual(200);
    expect({ erro: true }).toEqual(resp.response);
  });
  test("findCEP value invalid", async () => {
    const resp = await findCEP("00000-99");
    expect(resp.status).toEqual(406);
    expect("CEP não definido ou inválido").toEqual(resp.response);
  });
});
