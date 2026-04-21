import { INCREMENT, DECREMENT, RESET, SHOW_TOAST, CLEAR_TOAST } from './actionTypes'

export const increment = () => ({ type: INCREMENT })

export const decrement = () => ({ type: DECREMENT })

export const reset = () => ({ type: RESET })

// type: 'success' | 'error' | 'warning' | 'info'
export const showToast = (message, type = 'info') => ({
  type: SHOW_TOAST,
  payload: { message, type, toastId: Date.now() },
})

export const clearToast = () => ({ type: CLEAR_TOAST })
