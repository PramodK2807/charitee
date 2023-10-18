import { configureStore } from "@reduxjs/toolkit";

import requestReducer from "./features/requests/requestSlice";

export const store = configureStore({
  reducer: {
    requestsData : requestReducer,
  },
});