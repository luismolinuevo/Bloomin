import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";

// const rootReducer = combineReducers({
//   auth: auth
// },);

// export const store = configureStore({
//   reducer: rootReducer,

//  });

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: auth,
    },
  });
};
