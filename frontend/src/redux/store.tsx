import { configureStore } from '@reduxjs/toolkit'
import ActorReducer from './ActorSlice'

export default configureStore({
  reducer: {
    actor: ActorReducer,
  },
})