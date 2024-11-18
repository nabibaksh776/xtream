"use client";
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/Slice";
// import VoiceSlice from "@/redux/voice/VoiceSlice"
import SocialSlice from "./social/socialSlice";
import Auth_States from "./Auth/Auth";
import llm_Slice from "./LlmScrapper/Slices";
import ChatBot from "./chatBot/Chat";
import Notifications_Slice from "./Notifications/NotificationsSlice";
import Gobal_States from "./GlobalStates/GlobalStates";
import stepsReducer from "./onboarding/onboardingSlice";
// the store_room
export const store = configureStore({
  reducer: {
    social: SocialSlice,
    Auth_States: Auth_States,
    llm_Slice: llm_Slice,
    ChatBot: ChatBot,
    Notifications_Slice: Notifications_Slice,
    Gobal_States,
    steps: stepsReducer,
    Theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
