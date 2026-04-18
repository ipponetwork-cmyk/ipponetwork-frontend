import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'
import toastReducer from './toastReducer'
import apiReducer from './apiReducer'

const store = configureStore({
  reducer: {
    counter: reducer,
    toast: toastReducer,
    api: apiReducer,
  },
})

export default store
