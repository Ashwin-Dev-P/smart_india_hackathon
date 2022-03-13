import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import logger from "redux-logger";

//reducers
import getAppDetailsReducer from "./reducers/getAppDetails.reducer";
import loginReducer from "./reducers/login.reducer";
import registerReducer from "./reducers/register.reducer";
import logoutReducer from "./reducers/logout.reducer";

//classes reducer
import getClassesReducer from "./reducers/classes/getClasses.reducer";
import addClassReducer from "./reducers/classes/addClass.reducer";
import addStudentReducer from "./reducers/classes/class/addStudent.reducer";
import getStudentsReducer from "./reducers/classes/class/getStudents.reducer";
import markAttendanceReducer from "./reducers/classes/class/markAttendance.reducer";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      getAppDetailsReducer: getAppDetailsReducer,
      classes: getClassesReducer,
      addClass: addClassReducer,
      addStudent: addStudentReducer,
      getStudents: getStudentsReducer,
      markAttendance: markAttendanceReducer,
      loginReducer: loginReducer,
      registerReducer: registerReducer,
      logoutReducer: logoutReducer,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
