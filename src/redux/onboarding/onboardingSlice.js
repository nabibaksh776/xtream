import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  steps: [
    { label: 'Welcome onboarding', step: 'STEP 1', completed: false, value: 1 },
    { label: 'URL Confirmation', step: 'STEP 2', completed: false, value: 2 },
    { label: 'Integrations', step: 'STEP 3', completed: false, value: 3 },
    { label: 'Setup Phones', step: 'STEP 4', completed: false, value: 4 },
    { label: 'Email Account Setup', step: 'STEP 5', completed: false, value: 5 },
    { label: 'Calendar', step: 'STEP 6', completed: false, value: 6 },
    { label: 'Website Connection', step: 'STEP 7', completed: false, value: 7 },
    { label: 'Create BOTs', step: 'STEP 10', completed: false, value: 8 },
    { label: 'Chat and voice input', step: 'STEP 8', completed: false, value: 9 },
    { label: 'Company Data', step: 'STEP 9', completed: false, value: 10 }
  ],
  handleSteps: {
    steps: 0
  }
}

const stepsSlice = createSlice({
  name: 'steps',
  initialState,
  reducers: {
    toggleStepCompletion: (state, action) => {
      const stepIndex = action.payload
      state.steps[stepIndex].completed = true
    },
    markStepIncomplete: (state, action) => {
      const stepIndex = action.payload
      state.steps[stepIndex].completed = false
    },
    handleFormSteps: (state, action) => {
      const value = action.payload
      if (value == 'increase') {
        console.log('you want to increase')
        if (state.handleSteps.steps < 9) {
          state.handleSteps.steps += 1
        }
      } else if (value == 'decrease') {
        console.log('you want to decrease')
        if (state.handleSteps.steps > 0) {
          state.handleSteps.steps = state.handleSteps.steps - 1
        }
      } else if (typeof value === 'number') {
        state.handleSteps.steps = value
      }
    }
  },
})
export default stepsSlice.reducer

export const selectCompletionPercentage = state => {
  const totalSteps = state.steps.steps.length
  const completedSteps = state.steps.steps.filter(step => step.completed).length
  return (completedSteps / totalSteps) * 100
}
export const { toggleStepCompletion, markStepIncomplete, handleFormSteps } = stepsSlice.actions
