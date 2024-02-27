import { combineReducers, configureStore } from "@reduxjs/toolkit";
import resumeSlice from "./slices/resumeSlice";
import resumePageSlice from "./slices/page/resumesPageSlice";
import resumePreviewPageSlice from "./slices/page/resumePreviewPageSlice";

const rootReducer = combineReducers({
  [resumeSlice.name]: resumeSlice.reducer,
  page: combineReducers({
    [resumePageSlice.name]: resumePageSlice.reducer,
    [resumePreviewPageSlice.name]: resumePreviewPageSlice.reducer,
  }),
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
