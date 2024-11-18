import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Store Embedding
export const get_integrationsById = createAsyncThunk('/user/integration', async (query, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/api/user/integration`, query)
    if (response.status == 200) {
      return response.data
    } else {
      return rejectWithValue(error.response.data.message || 'An error occurred try later..')
    }
  } catch (error) {
    // Check if error response exists and has a status
    return rejectWithValue(error.response.data.error || 'An error occurred try later..')
  }
})
