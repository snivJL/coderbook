import * as types from "../constants/comment.constants";
import api from "../api";

const createComment = (postId, body) => async (dispatch) => {
  dispatch({ type: types.CREATE_COMMENT_REQUEST });

  try {
    const res = await api.post(`/posts/${postId}/comments`, { body });
    dispatch({
      type: types.CREATE_COMMENT_SUCCESS,
      payload: res.data.data.post,
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: types.CREATE_COMMENT_FAILURE, payload: error });
  }
};

export const commentActions = { createComment };
