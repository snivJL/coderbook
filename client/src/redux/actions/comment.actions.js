import * as types from "../constants/comment.constants";
import api from "../api";
import { toast } from "react-toastify";

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
const deleteComment = (commentId) => async (dispatch) => {
  dispatch({ type: types.DELETE_COMMENT_REQUEST });

  try {
    const res = await api.delete(`/comments/${commentId}`);
    dispatch({
      type: types.DELETE_COMMENT_SUCCESS,
      payload: res.data,
    });
    toast.success("Comment deleted");
  } catch (error) {
    console.error(error);
    dispatch({ type: types.DELETE_COMMENT_FAILURE, payload: error });
  }
};

const updateComment = (commentId, content) => async (dispatch) => {
  dispatch({ type: types.UPDATE_COMMENT_REQUEST });

  try {
    const res = await api.put(`/comments/${commentId}`, { content });
    dispatch({
      type: types.UPDATE_COMMENT_SUCCESS,
      payload: res.data,
    });
    toast.success("Comment updated");
  } catch (error) {
    console.error(error);
    dispatch({ type: types.UPDATE_COMMENT_FAILURE, payload: error });
  }
};

export const commentActions = { createComment, deleteComment, updateComment };
