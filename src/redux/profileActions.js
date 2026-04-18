import { userAPI } from '../services/userAPI';
import {
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  CHECK_USERNAME_REQUEST,
  CHECK_USERNAME_SUCCESS,
  CHECK_USERNAME_FAILURE,
} from './actionTypes';
import { showToast } from './actions';

// Action creators for getting user profile
export const getUserProfileRequest = () => ({
  type: GET_USER_PROFILE_REQUEST,
});

export const getUserProfileSuccess = (profile) => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: profile,
});

export const getUserProfileFailure = (error) => ({
  type: GET_USER_PROFILE_FAILURE,
  payload: error,
});

// Thunk action for getting user profile by mobile number
export const getUserProfileByMobileNo = (mobileno) => {
  return async (dispatch) => {
    dispatch(getUserProfileRequest());
    try {
      const response = await userAPI.getUserProfileByMobileNo(mobileno);
      dispatch(getUserProfileSuccess(response));
      return response;
    } catch (error) {
      dispatch(getUserProfileFailure(error));
      dispatch(showToast(error.message || 'Failed to get user profile', 'error'));
      throw error;
    }
  };
};

// Action creators for updating user profile
export const updateUserProfileRequest = () => ({
  type: UPDATE_USER_PROFILE_REQUEST,
});

export const updateUserProfileSuccess = (profile) => ({
  type: UPDATE_USER_PROFILE_SUCCESS,
  payload: profile,
});

export const updateUserProfileFailure = (error) => ({
  type: UPDATE_USER_PROFILE_FAILURE,
  payload: error,
});

// Thunk action for updating user profile
export const updateUserProfile = (userId, profileData, files) => {
  return async (dispatch) => {
    dispatch(updateUserProfileRequest());
    try {
      const response = await userAPI.updateUserProfile(userId, profileData, files);
      dispatch(updateUserProfileSuccess(response));
      dispatch(showToast('Profile updated successfully', 'success'));
      return response;
    } catch (error) {
      dispatch(updateUserProfileFailure(error));
      dispatch(showToast(error.message || 'Failed to update profile', 'error'));
      throw error;
    }
  };
};

// Action creators for checking username
export const checkUsernameRequest = () => ({
  type: CHECK_USERNAME_REQUEST,
});

export const checkUsernameSuccess = (result) => ({
  type: CHECK_USERNAME_SUCCESS,
  payload: result,
});

export const checkUsernameFailure = (error) => ({
  type: CHECK_USERNAME_FAILURE,
  payload: error,
});

// Thunk action for checking username
export const checkUsername = (username) => {
  return async (dispatch) => {
    dispatch(checkUsernameRequest());
    try {
      const response = await userAPI.checkUsername(username);
      dispatch(checkUsernameSuccess(response));
      return response;
    } catch (error) {
      dispatch(checkUsernameFailure(error));
      dispatch(showToast(error.message || 'Failed to check username', 'error'));
      throw error;
    }
  };
};