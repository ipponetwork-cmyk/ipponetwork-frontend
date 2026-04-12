import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'
import toastReducer from './toastReducer'

const store = configureStore({
  reducer: {
    counter: reducer,
    toast: toastReducer,
  },
})

export default store
