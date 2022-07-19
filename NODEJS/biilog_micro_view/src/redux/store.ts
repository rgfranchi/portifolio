import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";
import { loadStorage, saveStorage } from "./localStorage";
// ferramenta para visualizar redux no navegador.
const composedEnhancer = composeWithDevTools(
  applyMiddleware(thunk)
  // other store enhancers if any
);
const store = createStore(rootReducer, loadStorage(), composedEnhancer);
store.subscribe(() => {
  saveStorage(store.getState());
});
export default store;
