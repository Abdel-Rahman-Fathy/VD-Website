import { configureStore } from "@reduxjs/toolkit";
import projectsSlice from "./reducers/projectsSlice";
import servicesSlice from "./reducers/servicesSlice";
import settingsSlice from "./reducers/settingsSlice";
import mainSlice from "./reducers/mainSlice";
import aboutSlice from "./reducers/aboutSlice";
import newsSlice from "./reducers/newsSlice";
import designsSlice from "./reducers/designsSlice";
import userSlice from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    projects: projectsSlice,
    services: servicesSlice,
    settings: settingsSlice,
    main: mainSlice,
    news: newsSlice,
    about: aboutSlice,
    designs: designsSlice,
    user: userSlice,
  },
});
