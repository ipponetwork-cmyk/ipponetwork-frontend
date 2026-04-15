import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  CHECK_USERNAME_REQUEST,
  CHECK_USERNAME_SUCCESS,
  CHECK_USERNAME_FAILURE,
} from './actionTypes'

const initialState = {
  createPost: {
    loading: false,
    post: null,
    error: null,
  },
  profile: {
    loading: false,
    profile: null,
    usernameCheck: null,
    error: null,
  },
}

export default function apiReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return {
        ...state,
        createPost: {
          ...state.createPost,
          loading: true,
          error: null,
        },
      }
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        createPost: {
          ...state.createPost,
          loading: false,
          post: action.payload,
          error: null,
        },
      }
    case CREATE_POST_FAILURE:
      return {
        ...state,
        createPost: {
          ...state.createPost,
          loading: false,
          error: action.payload,
        },
      }
    case GET_USER_PROFILE_REQUEST:
    case UPDATE_USER_PROFILE_REQUEST:
    case CHECK_USERNAME_REQUEST:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: true,
          error: null,
        },
      }
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: false,
          profile: action.payload,
          error: null,
        },
      }
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: false,
          profile: action.payload,
          error: null,
        },
      }
    case CHECK_USERNAME_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: false,
          usernameCheck: action.payload,
          error: null,
        },
      }
    case GET_USER_PROFILE_FAILURE:
    case UPDATE_USER_PROFILE_FAILURE:
    case CHECK_USERNAME_FAILURE:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: false,
          error: action.payload,
        },
      }
    default:
      return state
  }
}