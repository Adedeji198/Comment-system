import { SETCOMMENT } from "../type";

export default (state, action) => {
  switch (action.type) {
    case SETCOMMENT:
      return {
        ...state,
        comment: action.payload,
      };
      break;

    default:
      break;
  }
};
