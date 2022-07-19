import React from "react";

import Enzime, { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";

import {
  ButtonIconUpdate,
  ButtonIconDelete,
  ButtonCreate,
  ButtonsPanel,
  IButtonsPanel,
} from "../../components/ButtonsComponent";

Enzime.configure({ adapter: new Adapter() });

const linkTo: string = "http://linkteste.com.br";

describe("ButtonsComponent snapshot", () => {
  test("ButtonIconUpdate", () => {
    const wrapper = shallow(<ButtonIconUpdate linkTo={linkTo} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test("ButtonIconDelete", () => {
    const wrapper = shallow(<ButtonIconDelete execute={() => {}} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test("ButtonCreate", () => {
    const wrapper = shallow(
      <ButtonCreate
        linkTo={linkTo}
        text="Novo Item"
        variant="outline-success"
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test("ButtonsPanel", () => {
    const btList: IButtonsPanel = {
      column: 4,
      list: [
        {
          id: 1,
          text: "Bt Test 1",
          execute: () => {},
          variant: "outline-primary",
        },
        {
          id: 2,
          text: "Bt Test 2",
          execute: () => {},
          variant: "outline-primary",
        },
        {
          id: 3,
          text: "Bt Test 3",
          execute: () => {},
          variant: "outline-primary",
        },
      ],
    };
    const wrapper = shallow(
      <ButtonsPanel column={btList.column} list={btList.list} />
    );
    const button = wrapper.find("Button");
    expect(button.length).toBe(btList.list.length);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe("ButtonsComponent execute", () => {
  test("ButtonIconDelete", () => {
    const clickEd = jest.fn();
    const button = shallow(<ButtonIconDelete execute={clickEd} />);
    button.find("Button").simulate("click");
    expect(clickEd.mock.calls.length).toEqual(1);
  });
});
