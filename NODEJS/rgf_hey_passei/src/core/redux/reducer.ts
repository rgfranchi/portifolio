import { combineReducers } from "redux";

import modalReducer from "./slice/modalSlice";
import alertReducer from "./slice/alertSlice";
import sessionReducer from "../../app/redux/slice/sessionSlice";
import { destroyStorage } from "./localStorage";
import { IReducer } from "../interfaces/ReduxInterface";

const appReducer = combineReducers<IReducer>({
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
