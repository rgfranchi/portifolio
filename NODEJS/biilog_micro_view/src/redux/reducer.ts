import { combineReducers } from "redux";

import companyReducer from "./companySlice";
import sessionReducer from "./sessionSlice";
import modalReducer from "./modalSlice";
import alertReducer from "./alertSlice";
import { destroyStorage } from "./localStorage";
import { IReducer } from "../interfaces/ReduxInterface";

const appReducer = combineReducers<IReducer>({
  companies: companyReducer,
  session: sessionReducer,
  modals: modalReducer,
  alert: alertReducer,
});

// https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
const rootReducer = (state: any, action: any) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
    destroyStorage();
  }
  return appReducer(state, action);
};

export default rootReducer;
