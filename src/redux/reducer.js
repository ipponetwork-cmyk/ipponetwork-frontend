import { SHOW_TOAST, SET_PROFILE } from './actionTypes'

const initialState = {
  toast: {
    message: null,
    type: 'info',
    toastId: null,
  },
  profileDetails: {
    name: '',
    username: '',
    dob: '',
    emailid: '',
    photo: '',
    mobile: ''
  },
}

export default function ippoReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        ...state,
        toast: {
          message: action.payload.message,
          type: action.payload.type,
          toastId: action.payload.toastId,
        },
      }
    case SET_PROFILE:
      return {
        ...state,
        profileDetails: action.payload,
      }
    default:
      return state
  }
}