import { createSlice } from '@reduxjs/toolkit'

export const ActorSlice = createSlice({
  name: 'actor',
  initialState: {
    value: '',
  },
  reducers: {
    setActor: (state, action) => {
        state.value = action.payload
    },
    },
})
    
export const { setActor } = ActorSlice.actions
export default ActorSlice.reducer