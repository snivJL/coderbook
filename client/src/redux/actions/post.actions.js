import * as types from "../constants/post.constants";
import api from "../api";
import { routeActions } from "./route.actions";
import { toast } from "react-toastify";

const postsRequest = (
  pageNum = 1,
  limit = 10,
  query = null,
  ownerId = null,
  sortBy = null
) => async (dispatch) => {
  dispatch({ type: types.POST_REQUEST, payload: null });
  try {
    let queryString = "";
    if (query) {
      queryString = `&content[$regex]=${query}&content[$options]=i`;
    }
    if (ownerId) {
      queryString = `${queryString}&author=${ownerId}`;
    }
    let sortByString = "";
    if (sortBy?.key) {
      sortByString = `&sortBy[${sortBy.key}]=${sortBy.ascending}`;
    }
    const res = await api.get(
      `/posts?page=${pageNum}&limit=${limit}${queryString}${sortByString}`
    );
    dispatch({
      type: types.POST_REQUEST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: types.POST_REQUEST_FAILURE, payload: error });
  }
};

const getSinglePost = (postId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_POST_REQUEST, payload: null });
  try {
    const res = await api.get(`/posts/${postId}`);
    dispatch({
      type: types.GET_SINGLE_POST_REQUEST_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_POST_REQUEST_FAILURE, payload: error });
  }
};

const createReview = (postId, reviewText) => async (dispatch) => {
  dispatch({ type: types.CREATE_REVIEW_REQUEST, payload: null });
  try {
    const res = await api.post(`/reviews/posts/${postId}`, {
      content: reviewText,
    });
    dispatch({
      type: types.CREATE_REVIEW_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_REVIEW_FAILURE, payload: error });
  }
};

const createPost = (body, images) => async (dispatch) => {
  dispatch({ type: types.CREATE_POST_REQUEST, payload: null });
  try {
    // For uploading file manually
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("content", content);
    // if (images && images.length) {
    //   for (let index = 0; index < images.length; index++) {
    //     formData.append("images", images[index]);
    //   }
    // }
    // const res = await api.post("/posts", formData);

    // Upload images using cloudinary already
    const { data } = await api.post("/posts", { body, images });

    dispatch({
      payload: data,
      type: types.CREATE_POST_SUCCESS,
    });
    dispatch(routeActions.redirect("__GO_BACK__"));
    toast.success("Post created");
  } catch (error) {
    dispatch({ type: types.CREATE_POST_FAILURE, payload: error });
  }
};

const updatePost = (postId, title, content, images) => async (dispatch) => {
  dispatch({ type: types.UPDATE_POST_REQUEST, payload: null });
  try {
    // let formData = new FormData();
    // formData.set("title", title);
    // formData.set("content", content);
    const { data } = await api.put(`/posts/${postId}`, {
      title,
      content,
      images,
    });
    dispatch({
      payload: data,
      type: types.UPDATE_POST_SUCCESS,
    });
    dispatch(routeActions.redirect("__GO_BACK__"));
    toast.success("Post updated.");
  } catch (error) {
    dispatch({ type: types.UPDATE_POST_FAILURE, payload: error });
  }
};

const deletePost = (postId) => async (dispatch) => {
  dispatch({ type: types.DELETE_POST_REQUEST, payload: null });
  try {
    const res = await api.delete(`/posts/${postId}`);
    dispatch({
      payload: res.data,
      type: types.DELETE_POST_SUCCESS,
    });
    dispatch(routeActions.redirect("__GO_BACK__"));
    toast.success("Post deleted.");
  } catch (error) {
    dispatch({ type: types.DELETE_POST_FAILURE, payload: error });
  }
};

const createPostReaction = (targetType, targetId, body) => async (dispatch) => {
  dispatch({ type: types.SEND_REACTION_REQUEST, payload: null });
  try {
    const { data } = await api.post(`/posts/${targetId}/reactions`, {
      targetType,
      body,
    });
    if (targetType === "Blog") {
      dispatch({
        payload: data.data.post,
        type: types.POST_REACTION_SUCCESS,
      });
    }
    if (targetType === "Review") {
      dispatch({
        type: types.REVIEW_REACTION_SUCCESS,
        payload: { reactions: data.data, reviewId: targetId },
      });
    }
  } catch (error) {
    dispatch({ type: types.SEND_REACTION_FAILURE, payload: error });
  }
};

const selectBlog = (postId) => async (dispatch) => {
  dispatch({ type: types.SELECT_BLOG, payload: postId });
};
export const postActions = {
  postsRequest,
  getSinglePost,
  createReview,
  createPost,
  updatePost,
  deletePost,
  createPostReaction,
  selectBlog,
};
