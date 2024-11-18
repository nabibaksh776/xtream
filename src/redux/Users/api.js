import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@/utils/axiosInstance'

// export const Register = createAsyncThunk('/user/id', async (data, { rejectWithValue }) => {
//   try {
//     return response // Ensure you return response.data or appropriate data
//   } catch (error) {
//     // Check if error response exists and has a status
//     if (error.response) {
//       if (error.response.status === 403) {
//         console.log('Error status is 403')
//         const message = error.response.data.message || 'Forbidden'
//         return rejectWithValue(message)
//       } else if (error.response.status === 400) {
//         return rejectWithValue(error.response.data.message || 'Bad Request')
//       } else {
//         return rejectWithValue(error.response.data.message || 'An error occurred')
//       }
//     } else {
//       // Handle cases where error.response does not exist
//       return rejectWithValue('Network error or server not reachable')
//     }
//   }
// })
