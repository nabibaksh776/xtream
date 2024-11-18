import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
//
//
//
//
//
let BASE_URL = process.env.NEXT_PUBLIC_AI_URL


// Store Embedding
export const store_embeddings_fun = createAsyncThunk('/store/embedding', async (query, { rejectWithValue }) => {
  console.log("🚀 ~ conststore_embeddings_fun=createAsyncThunk ~ query:", query)
  try {
    const response = await axios.post(`${BASE_URL}/store-embeddings/?site=${query}`)
    return response.data
  } catch (error) {
    // Check if error response exists and has a status
    return rejectWithValue(error.response.data.detail || 'An error occurred try later..')
  }
})
//
//
//
//
//
// AskQuestion Live Chat API
export const ask_any_question = createAsyncThunk('/ask/question', async (query, { rejectWithValue }) => {
  try {
    let url = `${BASE_URL}/ask-question/?query_text=${query.text}&domain_name=${query.domain}`
    const response = await axios.post(url)
    return response.data
  } catch (error) {
    console.log('api error is here----', error)
    if (error.message) {
      // Check if error response exists and has a status
      return rejectWithValue(error?.message)
    } else {
      return rejectWithValue(error.response.data.detail || 'An error occurred try later..')
    }
  }
})
