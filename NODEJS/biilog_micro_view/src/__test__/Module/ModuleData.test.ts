import { emptyModule } from "../../Module/ModuleData";

describe("Module variables", () => {
  /**
   * verifica variáveis que influencia na atualização/criação
   */
  test("emptyData", () => {
    expect(emptyModule.id).toEqual(0);
  });
});
