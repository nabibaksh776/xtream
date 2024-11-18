import { createSlice } from '@reduxjs/toolkit'
import { store_embeddings_fun, ask_any_question } from './Apis'

const initialState = {
  store_embeddings: {
    isSuccess: false,
    loading: false,
    error: null,
    isError: false,
    data: null
  },
  ask_quetsion: {
    isSuccess: false,
    loading: false,
    error: null,
    isError: false,
    data: null
  }
}

export const llm_Slice = createSlice({
  name: 'llm_Slice',
  initialState,
  reducers: {
    RESET(state) {
      state.store_embeddings = {
        isSuccess: false,
        loading: false,
        error: null,
        isError: false,
        data: null
      }
      state.ask_quetsion = {
        isSuccess: false,
        loading: false,
        error: null,
        isError: false,
        data: null
      }
    },
    RESET_STORE_embeddingState(state) {
      state.store_embeddings = {
        isSuccess: false,
        loading: false,
        error: null,
        isError: false,
        data: null
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(store_embeddings_fun.pending, state => {
        state.store_embeddings = {
          isSuccess: false,
          loading: true,
          error: null,
          isError: false,
          data: null
        }
      })
      .addCase(store_embeddings_fun.fulfilled, (state, action) => {
        state.store_embeddings = {
          isSuccess: true,
          loading: false,
          error: null,
          isError: false,
          data: action.payload
        }
      })
      .addCase(store_embeddings_fun.rejected, (state, action) => {
        state.store_embeddings = {
          isSuccess: false,
          loading: false,
          error: action.payload,
          isError: true,
          error: null,
          data: null
        }
      })

      // api to ask question
      .addCase(ask_any_question.pending, (state, action) => {
        state.ask_quetsion = {
          isSuccess: false,
          loading: true,
          error: null,
          data: null
        }
      })
      .addCase(ask_any_question.fulfilled, (state, action) => {
        state.ask_quetsion = {
          isSuccess: true,
          loading: false,
          error: null,
          data: action.payload
        }
      })
      .addCase(ask_any_question.rejected, (state, action) => {
        state.ask_quetsion = {
          isSuccess: false,
          loading: false,
          error: action.payload,
          data: null
        }
      })
  }
})

// Action creators are generated for each case reducer function
export const { RESET, RESET_STORE_embeddingState } = llm_Slice.actions
export default llm_Slice.reducer
