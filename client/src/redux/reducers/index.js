import { combineReducers } from "redux";
import getAppDetailsReducer from "./getAppDetails.reducer";
import loginReducer from "./login.reducer";

//NOTE : Combine reducers in configure store , NOT HERE
export default combineReducers({
  getAppDetailsReducer: getAppDetailsReducer,
  loginReducer: loginReducer,
});
