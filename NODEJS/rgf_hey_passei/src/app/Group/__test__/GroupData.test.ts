import { findGroupByName, IGroup } from "../GroupData";

describe("Busca grupo por nome", () => {
  test("GroupData findGroupByName", async () => {
    const resp = await findGroupByName("professor");
    // expect(resp.response).(1);
    expect(resp.status).toEqual(200);
    if (Array.isArray(resp.response)) {
      const group: IGroup = resp.response[0];
      expect(group.name).toEqual("professor");
      expect(group.label).toEqual("Professor");
    } else {
      fail("GRUPO NÃO FOI RESPONDIDO COMO ESPERADO");
    }
  });
});
