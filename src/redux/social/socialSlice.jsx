import { createSlice } from '@reduxjs/toolkit'
import { get_integrationsById } from './api'
// global states are here
const initialState = {
  social_integration: [
    { name: 'github', isActive: false, value: 1, token: null },
    { name: 'google', isActive: false, value: 2, token: null },
    { name: 'twiiter', isActive: false, value: 3, token: null },
    { name: 'tiktok', isActive: false, value: 4, token: null },
    { name: 'ghl', isActive: false, value: 5, token: null },
    { name: 'facebook', isActive: false, value: 6, token: null },
    { name: 'instagram', isActive: false, value: 7, token: null },
    { name: 'apple', isActive: false, value: 8, token: null },
    { name: 'cognito', isActive: false, value: 9, token: null },
    { name: 'discord', isActive: false, value: 10, token: null },
    { name: 'dropbox', isActive: false, value: 11, token: null },
    { name: 'linkedin', isActive: false, value: 13, token: null },
    { name: 'slack', isActive: false, value: 14, token: null }
  ],

  getIntegrationById: {
    loading: false,
    error: null,
    data: null,
    isSuccess: false
  }
}

export const SocialSlice = createSlice({
  name: 'SocialSlice',
  initialState,
  reducers: {
    // handle integration of social media
    Add_Integration(state, action) {
      const { provider, token } = action.payload
      console.log('this is given provider in reduxx ', provider)
      const social = state.social_integration
      const socialIndex = social.findIndex(item => item.name == provider)
      if (socialIndex != -1) {
        social[socialIndex].isActive = true
        social[socialIndex].token = token ? token : null
        state.social_integration = social
      }
    }
  },
  // extra reducers to get API and manage State in redux
  extraReducers: builder => {
    builder
      .addCase(get_integrationsById.pending, state => {
        state.getIntegrationById = {
          loading: true,
          error: null,
          data: null,
          isSuccess: false
        }
      })
      .addCase(get_integrationsById.fulfilled, (state, action) => {
        let payloadData = action.payload
        console.log('payloadData---', payloadData)
        let newUpdateStateAry = []
        if (payloadData.data && payloadData.data.length > 0) {
          payloadData.data.forEach((item, index) => {
            state.social_integration.forEach((item2, index) => {
              if (item.provider === item2.name) {
                item2.isActive = true
              } else {
                item2.isActive = false
              }
              newUpdateStateAry.push(item2)
            })
          })

          state.social_integration = newUpdateStateAry
        }

        state.getIntegrationById = {
          loading: false,
          error: null,
          data: state.social_integration,
          isSuccess: true
        }
      })
      .addCase(get_integrationsById.rejected, (state, action) => {
        state.getIntegrationById = {
          loading: false,
          error: action.payload,
          data: null,
          isSuccess: false
        }
      })
  }
})

// Action creators are generated for each case reducer function
export const { RESET_States, Add_Integration } = SocialSlice.actions
export default SocialSlice.reducer
