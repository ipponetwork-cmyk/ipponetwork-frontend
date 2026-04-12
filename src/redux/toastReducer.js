import { SHOW_TOAST, CLEAR_TOAST } from './actionTypes'

const initialState = {
  message: null,
  type: 'info',
  toastId: null,
}

export default function toastReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        message: action.payload.message,
        type: action.payload.type,
        toastId: action.payload.toastId,
      }
    case CLEAR_TOAST:
      return initialState
    default:
      return state
  }
}
