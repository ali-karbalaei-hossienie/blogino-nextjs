import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "../features/settingSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      // ردیوسرهای شما
      setting: settingReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
