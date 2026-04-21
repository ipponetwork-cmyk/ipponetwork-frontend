import { postAPI } from '../services/postAPI';
import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
} from './actionTypes';
import { showToast } from './actions';

// Action creators for creating a post
export const createPostRequest = () => ({
  type: CREATE_POST_REQUEST,
});

export const createPostSuccess = (post) => ({
  type: CREATE_POST_SUCCESS,
  payload: post,
});

export const createPostFailure = (error) => ({
  type: CREATE_POST_FAILURE,
  payload: error,
});

// Thunk action for creating a post
export const createPost = (postData) => {
  return async (dispatch) => {
    dispatch(createPostRequest());
    try {
      console.log('Creating post with data:', postData);
      const response = await postAPI.createPost(postData);
      dispatch(createPostSuccess(response));
      dispatch(showToast('Post created successfully', 'success'));
      return response;
    } catch (error) {
      console.error('Create post error:', error);
      const errorMessage = error?.message || error?.statusText || 'Failed to create post';
      dispatch(createPostFailure(errorMessage));
      dispatch(showToast(errorMessage, 'error'));
      throw error;
    }
  };
};