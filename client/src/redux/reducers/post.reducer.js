import * as types from "../constants/post.constants";

const initialState = {
  posts: [],
  totalPageNum: 1,
  selectedBlog: null,
  loading: false,
};

const postReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.POST_REQUEST:
    case types.CREATE_POST_REQUEST:
    case types.UPDATE_POST_REQUEST:
    case types.DELETE_POST_REQUEST:
    case types.GET_SINGLE_POST_REQUEST:
      return { ...state, loading: true };

    case types.POST_REQUEST_SUCCESS:
      return {
        ...state,
        posts: payload.searched
          ? payload.posts
          : [...state.posts, payload.posts].flat(),
        totalPageNum: payload.pageCount,
        numPosts: payload.numPosts,
        hasMore: payload.pageCount > payload.page,
        loading: false,
      };

    case types.GET_SINGLE_POST_REQUEST_SUCCESS:
      return { ...state, selectedBlog: payload, loading: false };

    case types.UPDATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedBlog: payload,
        posts: state.posts.map((post) =>
          post._id === payload._id ? payload : post
        ),
      };
    case types.SELECT_BLOG:
      return { ...state, selectedBlog: payload };

    case types.CREATE_POST_FAILURE:
    case types.UPDATE_POST_FAILURE:
    case types.DELETE_POST_FAILURE:
    case types.POST_REQUEST_FAILURE:
    case types.GET_SINGLE_POST_REQUEST_FAILURE:
      return { ...state, loading: false };

    case types.CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [payload, ...state.posts],
      };

    case types.DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedBlog: {},
        posts: state.posts.filter((post) => post._id !== payload._id),
      };

    case types.SEND_REACTION_REQUEST:
    case types.CREATE_REVIEW_REQUEST:
      return { ...state, submitLoading: true };

    case types.CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        submitLoading: false,
        selectedBlog: {
          ...state.selectedBlog,
          reviews: [...state.selectedBlog.reviews, payload],
        },
      };

    case types.POST_REACTION_SUCCESS:
      return {
        ...state,
        submitLoading: false,
        selectedBlog: { ...state.selectedBlog, reactions: payload },
      };

    case types.REVIEW_REACTION_SUCCESS:
      return {
        ...state,
        selectedBlog: {
          ...state.selectedBlog,
          reviews: [
            ...state.selectedBlog.reviews.map((review) => {
              if (review._id !== payload.reviewId) return review;
              return { ...review, reactions: payload.reactions };
            }),
          ],
        },
        submitLoading: false,
      };

    case types.SEND_REACTION_FAILURE:
    case types.CREATE_REVIEW_FAILURE:
      return { ...state, submitLoading: false };
    default:
      return state;
  }
};

export default postReducer;
