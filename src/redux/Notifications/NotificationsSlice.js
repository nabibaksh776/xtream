import { createSlice } from '@reduxjs/toolkit'

// global states are here
const initialState = {
  is_New: false,
  notficiations: []
}

export const Notifications_Slice = createSlice({
  name: 'Notifications_Slice',
  initialState,
  reducers: {
    RESET_States(state, action) {
      state.is_New = false
      state.notficiations = []
    },
    // handle integration of social media
    add_Notifications(state, action) {
      // the template should be {message : "some message here", type : "error"}
      // type are : error, success, warning
      state.is_New = true
      state.notficiations.push(action.payload)
    },
    Update_State(state, action) {
      let { indexNumber } = action.payload
      let arrayData = state.notficiations
      arrayData.splice(indexNumber,1)
      state.notficiations = arrayData
      state.is_New = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { RESET_States, add_Notifications, Update_State } = Notifications_Slice.actions
export default Notifications_Slice.reducer
