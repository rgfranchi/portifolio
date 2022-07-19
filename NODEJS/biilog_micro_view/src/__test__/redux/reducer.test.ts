import rootReducer from "../../redux/reducer";

const arrAccess = ["companies", "session", "modals", "alert"];
let state = {};
let action = {};

describe("rootReducer access", () => {
  test("all", () => {
    const resp = rootReducer(state, action);
    expect(arrAccess).toEqual(Object.keys(resp));
  });
});

describe("rootReducer type", () => {
  test("USER_LOGOUT", () => {
    action = {
      type: "USER_LOGOUT",
    };
    localStorage.setItem("state", "value");
    expect("value").toEqual(localStorage.getItem("state"));
    rootReducer(state, action);
    expect("").toEqual(localStorage.getItem("state"));
  });
});
