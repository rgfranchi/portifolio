import toJson from "enzyme-to-json";

/**
 * verifica o conteúdo de construção dos componentes Page.
 * @param {*} values -> array defaultPageText de test-text-defaults.js
 * @param {*} warpper -> componente que será testado, verifica Snapshot
 */
export const verifyPageContents = (values: any, wrapper: any) => {
  values.find.forEach((search: any) => {
    // console.log(search);
    expect(wrapper.find(search).exists()).toBeTruthy();
  });
  // console.log(toJson(wrapper));
  expect(toJson(wrapper)).toMatchSnapshot();
};

/**
 * verifica o conteúdo de construção dos componentes Page.
 * @param {*} values -> array defaultPageText de test-text-defaults.js
 * @param {*} warpper -> componente que será testado, verifica Snapshot
 */
export const verifyNotAccess = (values: any, wrapper: any) => {
  // console.log(values.find);
  values.find.forEach((search: any) => {
    // console.log(search);
    expect(wrapper.find(search).exists()).toBeFalsy();
  });
};

/**
 * verifica o conteúdo de construção dos componentes Page.
 * @param {*} values -> array defaultPageText de test-text-defaults.js
 * @param {*} history -> histórico da url para validação.
 */
export const loadHistoryPageContents = (values: any, history: any) => {
  history.entries[0].key = values.historyKey1;
  if (values.url1 !== "") {
    history.push(values.url1);
    history.entries[1].key = values.historyKey2;
  }
};
