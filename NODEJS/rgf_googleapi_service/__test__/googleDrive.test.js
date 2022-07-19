import { parents } from "../config/config.js";
import {
  createFile,
  updateFile,
  deleteFile,
  getFile,
  listFile,
} from "../googleDrive";

describe("Teste GOOGLE API - DRIVE", () => {
  /**
   * @todo: Envia arquivo de imagem sem conteúdo.
   */
  const defaultCreate = async (name) => {
    return await createFile(
      {
        name: name,
        parents,
      },
      {
        mimeType: "text/plain",
        body: "CREATE: ARQUIVO DE TESTE SERVICE",
        // mimeType: "image/png",
        // body: fs.createReadStream("teste1.png"),
      }
    );
  };

  test("Criar arquivo no google Drive", async () => {
    const resp = await defaultCreate("testFileCreateService.txt");
    expect(resp.status).toEqual(200);
    expect(resp.statusText).toEqual("OK");
    expect(resp.data.id).not.toBeUndefined();
  });

  test("Atualiza arquivo do google Drive", async () => {
    const newFile = await defaultCreate("testFileCreateUpdate.txt");
    expect(newFile.data.id).not.toBeUndefined();
    const resp = await updateFile(newFile.data.id, {
      mimeType: "text/plain",
      body: "UPDATE: ARQUIVO DE TESTE",
    });
    expect(resp.status).toEqual(200);
    expect(resp.statusText).toEqual("OK");
    expect(resp.data.id).toEqual(newFile.data.id);
  });

  test("Exclui arquivo do google Drive", async () => {
    const newFile = await defaultCreate("testFileCreateDelete.txt");
    expect(newFile.data.id).not.toBeUndefined();
    const resp = await deleteFile(newFile.data.id);
    expect(resp.status).toEqual(204);
    expect(resp.statusText).toEqual("No Content");
  });

  test("Recebe um arquivo do google Drive", async () => {
    const newFile = await defaultCreate("testFileGet.txt");
    expect(newFile.data.id).not.toBeUndefined();

    const resp = await getFile(newFile.data.id);
    expect(resp.data).toEqual("CREATE: ARQUIVO DE TESTE SERVICE");
    expect(resp.status).toEqual(200);
    expect(resp.statusText).toEqual("OK");
  });

  test("Lista todos os arquivo do google Drive", async () => {
    const newFile = await defaultCreate("testList.txt");
    expect(newFile.data.id).not.toBeUndefined();

    const resp = await listFile();

    expect(resp.data.files.length).toBeGreaterThan(0);
    expect(resp.status).toEqual(200);
    expect(resp.statusText).toEqual("OK");
  });
});
