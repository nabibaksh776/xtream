import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const Register = createAsyncThunk('/user/register', async (formData, { rejectWithValue }) => {
  try {
    console.log('this is data comming from formSubmit--', formData)
    const response = await axios.post('/api/user/register', formData)
    console.log('this is response of API---', response.data)
    return response.data
  } catch (error) {
    // Check if error response exists and has a status
    if (error.response) {
      if (error.response.status === 403) {
        console.log('Error status is 403')
        const message = error.response.data.message || 'Forbidden'
        return rejectWithValue(message)
      } else if (error.response.status === 400) {
        return rejectWithValue(error.response.data.message || 'Bad Request')
      } else {
        return rejectWithValue(error.response.data.message || 'An error occurred')
      }
    } else {
      // Handle cases where error.response does not exist
      return rejectWithValue('Network error or server not reachable')
    }
  }
})

// resend Varification Code
export const ResendVarifcationCode = createAsyncThunk('/user/resend-code', async (formData, { rejectWithValue }) => {
  try {
    // payload hosuld be "email":"wohare5294@adambra.com"
    const response = await axios.post('/api/user/resend-code', formData)

    return response
  } catch (error) {
    // Check if error response exists and has a status
    if (error.response) {
      if (error.response.status === 403) {
        console.log('Error status is 403')
        const message = error.response.data.message || 'Forbidden'
        return rejectWithValue(message)
      } else if (error.response.status === 400) {
        return rejectWithValue(error.response.data.message || 'Bad Request')
      } else {
        return rejectWithValue(error.response.data.message || 'An error occurred')
      }
    } else {
      // Handle cases where error.response does not exist
      return rejectWithValue('Network error or server not reachable')
    }
  }
})

// varifyEmail address function

// resend Varification Code
export const varifyEmailAddress = createAsyncThunk('/user/verify-code', async (formData, { rejectWithValue }) => {
  try {
    // payload hosuld be "email":"wohare5294@adambra.com"

    // example payload
    //  "email":"wohare5294@adambra.com",
    // "code":"32011"
    const response = await axios.post('/api/user/verify-code', formData)

    return response.data
  } catch (error) {
    // Check if error response exists and has a status
    if (error.response) {
      if (error.response.status === 403) {
        console.log('Error status is 403')
        const message = error.response.data.message || 'Forbidden'
        return rejectWithValue(message)
      } else if (error.response.status === 400) {
        return rejectWithValue(error.response.data.message || 'Bad Request')
      } else {
        return rejectWithValue(error.response.data.message || 'An error occurred')
      }
    } else {
      // Handle cases where error.response does not exist
      return rejectWithValue('Network error or server not reachable')
    }
  }
})

// function to check email address if varified or not
export const checkVarification = createAsyncThunk('/user/user-email-verify', async (email, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/user/user-email-verify', email)

    return response.data
  } catch (error) {
    // Check if error response exists and has a status
    console.log('this is response---', error)
    if (error.response) {
      if (error.response.status === 403) {
        const message = error.response.data.message ? error.response.data.message : error.response.data.error
        return rejectWithValue(message)
      } else if (error.response.status === 400) {
        return rejectWithValue(error.response.data.message || 'Bad Request')
      } else {
        const message = error.response.data.message ? error.response.data.message : error.response.data.error
        return rejectWithValue(message)
      }
    } else {
      // Handle cases where error.response does not exist
      return rejectWithValue('Network error or server not reachable')
    }
  }
})
