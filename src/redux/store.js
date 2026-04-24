import { configureStore } from '@reduxjs/toolkit'
import ippoReducer from './reducer'

const store = configureStore({
  reducer: ippoReducer,
})

export default store