import { combineReducers, configureStore } from "@reduxjs/toolkit";
import resumeSlice from "./slices/resumeSlice";

const rootReducer = combineReducers({
  [resumeSlice.name]: resumeSlice.reducer,
});

/* const persistConfig = {
  key: "root",
  storage: localStorage,
}; */

const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
