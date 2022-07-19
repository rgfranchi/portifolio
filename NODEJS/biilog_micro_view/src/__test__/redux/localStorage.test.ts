import {
  loadStorage,
  saveStorage,
  destroyStorage,
} from "../../redux/localStorage";

beforeEach(() => {
  localStorage.clear();
});

const object: any = { value: "MOCK OBJECT" };

describe("LocalStorage empty", () => {
  test("loadState -> saveState -> destroyState", () => {
    expect(loadStorage()).toBeUndefined();
    saveStorage(object);
    expect(loadStorage()).toEqual(object);
    destroyStorage();
    expect(loadStorage()).toBeUndefined();
  });
});
