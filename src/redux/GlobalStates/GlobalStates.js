import { createSlice } from "@reduxjs/toolkit";

// global states are here
const initialState = {
  setupWizard: {},
};

export const Gobal_States = createSlice({
  name: "Gobal_States",
  initialState,
  reducers: {
    // handle integration of social media
    AddSetupWizardField(state, action) {
      state.setupWizard = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { AddSetupWizardField }=Gobal_States.actions;
export default Gobal_States.reducer;
