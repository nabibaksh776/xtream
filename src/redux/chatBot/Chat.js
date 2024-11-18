import { createSlice } from '@reduxjs/toolkit'

// Initial state for the chat messages
const initialState = {
  chat_message: []
}

// Create the slice
export const ChatBot = createSlice({
  name: 'chatBot', // Changed from 'voice' to 'chatBot' for clarity
  initialState,
  reducers: {
    // Action to reset chat messages
    RESET_Chat(state) {
      state.chat_message = []
    },
    // Action to add a new message to the chat
    ADD_MESSAGE(state, action) {
      state.chat_message.push(action.payload)
    }
  }
})

// Export the action creators
export const { ADD_MESSAGE, RESET_Chat } = ChatBot.actions

// Export the reducer
export default ChatBot.reducer
