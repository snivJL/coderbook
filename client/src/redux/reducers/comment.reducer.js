import * as types from "../constants/comment.constants";

const initialState = {
  blog: {},
  loading: false,
};

const commentReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_COMMENT_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_COMMENT_SUCCESS:
      return { ...state, loading: false, blog: payload };
    case types.CREATE_COMMENT_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default commentReducer;
