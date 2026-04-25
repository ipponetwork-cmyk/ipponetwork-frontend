import { SHOW_TOAST, SET_PROFILE } from './actionTypes'


export const showToast = (message, type = 'info') => ({
  type: SHOW_TOAST,
  payload: { message, type, toastId: Date.now() },
})

export const setProfile = (profileData) => ({
  type: SET_PROFILE,
  payload: profileData,
})
