import { createSlice } from '@reduxjs/toolkit'
import { Register, ResendVarifcationCode, varifyEmailAddress, checkVarification } from './apis'

const initialState = {
  profile_data: {},
  step_2: null,
  step_3: null,
  step_4: null,
  user_registration: {
    loading: false,
    data: null,
    error: null,
    isSuccess: false
  },
  re_sendEmail: {
    loading: false,
    data: null,
    error: null,
    isSuccess: false
  },
  varifyEmailState: {
    loading: false,
    data: null,
    error: null,
    isSuccess: false
  },
  isEmailVarified: {
    loading: false,
    data: null,
    error: null,
    isSuccess: false
  }
}

export const Auth_States = createSlice({
  name: 'Auth_States',
  initialState,
  reducers: {
    registration_state(state, action) {
      const { formData, step } = action.payload
      if (step === 1) {
        state.profile_data = formData
      }
      if (step === 2) {
        state.step_2 = formData
      }
    },
    upated_registration_state(state, action) {
      const { name, value } = action.payload
      state.profile_data[name] = value
    },
    RESET_varifyEmailState(state, action) {
      state.varifyEmailState = {
        loading: false,
        data: null,
        error: null,
        isSuccess: false
      }
    },
    RESET_re_sendEmail(state, action) {
      state.re_sendEmail = {
        loading: false,
        data: null,
        error: null,
        isSuccess: false
      }
    },
    RESET_reset_CHECKEMAILVARIFICATION(state, action) {
      state.isEmailVarified = {
        loading: false,
        data: null,
        error: null,
        isSuccess: false
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(Register.pending, state => {
        state.user_registration.loading = true
        state.user_registration.error = null
        state.user_registration.isSuccess = false
      })
      .addCase(Register.fulfilled, (state, action) => {
        console.log('this is response in redux ---', action.payload)
        state.user_registration.loading = false
        state.user_registration.data = action.payload
        state.user_registration.error = null
        state.user_registration.isSuccess = true
      })
      .addCase(Register.rejected, (state, action) => {
        state.user_registration.loading = false
        state.user_registration.data = null
        state.user_registration.error = action.payload || 'An error occurred' // Handle undefined case
        state.user_registration.isSuccess = false
      })
      // // // /// // // / / / / / / / / /
      //
      //  ReSend Email with varification Code
      //
      // // // /// // // / / / / / / / / /
      .addCase(ResendVarifcationCode.pending, state => {
        state.re_sendEmail.loading = true
        state.re_sendEmail.error = null
        state.re_sendEmail.isSuccess = false
        state.re_sendEmail.data = null
      })
      .addCase(ResendVarifcationCode.fulfilled, (state, action) => {
        state.re_sendEmail.loading = false
        state.re_sendEmail.error = null
        state.re_sendEmail.isSuccess = true
        state.re_sendEmail.data = action.payload
      })
      .addCase(ResendVarifcationCode.rejected, (state, action) => {
        state.re_sendEmail.loading = false
        state.re_sendEmail.error = action.payload
        state.re_sendEmail.isSuccess = false
        state.re_sendEmail.data = null
      })
      // // // /// // // / / / / / / / / /
      //
      //  Varify Email Address
      //
      // // // /// // // / / / / / / / / /
      .addCase(varifyEmailAddress.pending, state => {
        state.varifyEmailState.loading = true
        state.varifyEmailState.error = null
        state.varifyEmailState.isSuccess = false
        state.varifyEmailState.data = null
      })
      .addCase(varifyEmailAddress.fulfilled, (state, action) => {
        state.varifyEmailState.loading = false
        state.varifyEmailState.error = null
        state.varifyEmailState.isSuccess = true
        state.varifyEmailState.data = action.payload
      })
      .addCase(varifyEmailAddress.rejected, (state, action) => {
        state.varifyEmailState.loading = false
        state.varifyEmailState.error = action.payload
        state.varifyEmailState.isSuccess = false
        state.varifyEmailState.data = null
      })
      // // // /// // // / / / / / / / / /
      //
      //  Check is email varified
      //
      // // // /// // // / / / / / / / / /
      .addCase(checkVarification.pending, state => {
        state.isEmailVarified = {
          loading: true,
          data: null,
          error: null,
          isSuccess: false
        }
      })
      .addCase(checkVarification.fulfilled, (state, action) => {
        state.isEmailVarified = {
          loading: false,
          data: action.payload,
          error: null,
          isSuccess: true
        }
      })
      .addCase(checkVarification.rejected, (state, action) => {
     
        state.isEmailVarified = {
          loading: false,
          data: null,
          error: action.payload,
          isSuccess: false
        }
      })
  }
})

export const {
  registration_state,
  upated_registration_state,
  RESET_varifyEmailState,
  RESET_re_sendEmail,
  RESET_reset_CHECKEMAILVARIFICATION
} = Auth_States.actions
export default Auth_States.reducer
