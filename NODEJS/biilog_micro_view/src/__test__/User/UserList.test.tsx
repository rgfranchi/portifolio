import React from "react";

import { act } from "react-dom/test-utils";
import Enzime, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import { createMemoryHistory } from "history";

import store from "../../redux/store";

import { mountProviderRouter } from "../testHelper/test-provider";

import UserList from "../../User/UserList";
import { listUserMock } from "../server/serverUser";

Enzime.configure({ adapter: new Adapter() });

let wrapper: any = null;
let history: any = null;
const listMock = listUserMock;

beforeEach(() => {
  history = createMemoryHistory();
});

describe("UserList snapshot", () => {
  test("empty", async () => {
    history.entries[0].key = "EMPTY_01";
    await setWrapperDefault([]);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test("with data", async () => {
    history.entries[0].key = "DATA_01";
    await setWrapperDefault(listMock);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe("UserList actions", () => {
  const count = listMock.length;
  const arrPos = 2;

  test("update", async () => {
    await setWrapperDefault(listMock);
    history.entries[0].key = "ACTION_UPDATE";
    const action = wrapper.find("ButtonIconUpdate");
    expect(action.length).toEqual(count);
    action.at(arrPos).simulate("click", { button: 0 });
    expect(history.location.pathname).toBe(
      "/urlFake/update/" + listMock[arrPos].id
    );
  });
  test("delete", async () => {
    const mockFunctionDelete = jest.fn((x) => x);
    await setWrapperDefault(listMock, mockFunctionDelete);
    history.entries[0].key = "ACTION_DEL";
    const action = wrapper.find("ButtonIconDelete");
    expect(action.length).toEqual(count);
    action.at(arrPos).simulate("click", { button: 0 });
    expect(mockFunctionDelete.mock.results[0].value).toBe(listMock[arrPos].id);
  });
});

describe("UserList access", () => {
  const count = listMock.length;

  test("update denied", async () => {
    expect(count).not.toEqual(0);
    await setWrapperDefault(listMock, () => {}, { delete: {} });
    history.entries[0].key = "ACTION_UPDATE";
    const action = wrapper.find("ButtonIconUpdate");
    expect(action.length).toEqual(0);
  });
  test("delete denied", async () => {
    expect(count).not.toEqual(0);
    await setWrapperDefault(listMock, () => {}, { update: {} });
    history.entries[0].key = "ACTION_DEL";
    const action = wrapper.find("ButtonIconDelete");
    expect(action.length).toEqual(0);
  });
});

const setWrapperDefault = async (
  list: any,
  handleDelete: any = () => {},
  access: any = { update: {}, delete: {} }
) => {
  await act(async () => {
    wrapper = await mountProviderRouter(
      mount,
      <UserList
        baseUrl="/urlFake"
        access={access}
        list={list}
        handleDeleteOpen={handleDelete}
      />,
      history,
      store
    );
  });
};

// Enzime.configure({ adapter: new Adapter() });

// test("UserList snapshot empty", () => {
//   const warpper = mount(
//     <UserList
//       baseUrl="/urlFake"
//       access={{ update: {}, delete: {} }}
//       list={[]}
//       handleDeleteOpen={() => {}}
//     />
//   );
//   expect(toJson(warpper)).toMatchSnapshot();
// });

// test("UserList snapshot data", () => {
//   const history = createMemoryHistory();
//   history.entries[0].key = "KEY_01";
//   const warpper = mount(
//     <Router history={history}>
//       <UserList
//         baseUrl="/urlFake"
//         access={{ update: {}, delete: {} }}
//         list={listUserMock}
//         handleDeleteOpen={() => {}}
//       />
//     </Router>
//   );
//   expect(toJson(warpper)).toMatchSnapshot();
// });

// test("UserList click update delete", () => {
//   let history = createMemoryHistory();
//   history.entries[0].key = "KEY_01";
//   const mockFunctionDelete = jest.fn((x) => x);
//   const warpper = mount(
//     <Router history={history}>
//       <UserList
//         baseUrl="/urlFake"
//         access={{ update: {}, delete: {} }}
//         list={listUserMock}
//         handleDeleteOpen={mockFunctionDelete}
//       />
//     </Router>
//   );
//   // testa link update
//   const update = warpper.find("ButtonIconUpdate");
//   expect(update.length).toEqual(3);
//   // verifica link antes.
//   expect(history.location.pathname).toBe("/");
//   // simula click
//   update.at(1).simulate("click", { button: 0 });
//   // verifica link depois.
//   expect(history.location.pathname).toBe("/urlFake/update/2");
//   // testa chamada a função delete
//   const del = warpper.find("ButtonIconDelete");
//   expect(del.length).toEqual(3);
//   // simula click
//   del.at(1).simulate("click");
//   // recebe a posição do elemento no array.
//   expect(mockFunctionDelete.mock.results[0].value).toBe(2);
// });
