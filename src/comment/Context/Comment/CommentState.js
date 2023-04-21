import { useReducer } from "react";
import { data } from "../data";
import { SETCOMMENT } from "../type";
import CommentContext from "./CommentContext";
import CommentReducer from "./CommentReducer";
import { v4 as uuidv4 } from "uuid";

const CommenState = (props) => {
  const myName = "elfque";
  const initialState = {
    comment: localStorage.getItem("comment")
      ? JSON.parse(localStorage.getItem("comment"))
      : [],
  };

  const [state, dispatch] = useReducer(CommentReducer, initialState);

  const storeComment = (newCom) => {
    localStorage.setItem("comment", JSON.stringify(newCom));
  };

  const formatDate = (date) => {
    const newDate = new Intl.DateTimeFormat("en-US").format(date);
    return newDate;
  };

  const addComment = (text) => {
    const randomNumber = Math.trunc(Math.random() * data.length);
    const currentDate = new Date();
    const realTime = currentDate.toISOString();
    const newComment = [
      ...state.comment,
      {
        id: uuidv4(),
        name: data[randomNumber].name,
        content: text,
        time: realTime,
        image: data[randomNumber].image,
        replies: [],
        vote: 0,
        fromMe: data[randomNumber].name === myName ? true : false,
      },
    ];
    dispatch({
      type: SETCOMMENT,
      payload: newComment,
    });
    storeComment(newComment);
  };

  const inputReply = (id, text) => {
    const randomNumber = Math.trunc(Math.random() * data.length);
    const currentDate = new Date();
    const realTime = currentDate.toISOString();

    const currComment = state.comment.find((comm) => comm.id === id);

    const newComment = state.comment.map((comm) => {
      if (comm !== currComment) {
        return comm;
      } else {
        return {
          ...comm,
          replies: [
            ...comm.replies,
            {
              id: uuidv4(),
              name: data[randomNumber].name,
              content: text,
              time: realTime,
              image: data[randomNumber].image,
              vote: 0,
            },
          ],
        };
      }
    });
    dispatch({ type: SETCOMMENT, payload: newComment });
    storeComment(newComment);
  };

  const diffTime = (date) => {
    const difference = new Date("2020-11-12") - date;
    let mainDifference = difference / (60 * 60 * 24);
    if (difference <= 60) {
      return "Just now";
    } else if (mainDifference < 1) {
      const mainMain = difference / (60 * 60);
      if (difference < 3600) {
        return `${diffTime / 60} mins ago`;
      } else {
        return `${mainMain} hours ago`;
      }
    } else if (mainDifference < 7) {
      return `${mainDifference} days ago`;
    } else {
      return formatDate(date);
    }
  };

  const addVote = (commId, operate) => {
    const comm = state.comment.find((com) => com.id === commId);
    let newComment = state.comment.map((coms) => {
      if (coms !== comm) {
        return coms;
      } else {
        if (operate === "add") {
          return { ...coms, vote: coms.vote + 1 };
        } else {
          return { ...coms, vote: coms.vote - 1 };
        }
      }
    });
    dispatch({ type: SETCOMMENT, payload: newComment });
    storeComment(newComment);
  };

  const addVoteReply = (commId, repId, operate) => {
    const comm = state.comment.find((com) => com.id === commId);
    const reply = comm.replies.find((rep) => rep.id === repId);

    const newComment = state.comment.map((coms) => {
      if (coms !== comm) {
        return coms;
      } else {
        const newCom = coms.replies.map((reps) => {
          if (reps !== reply) {
            return reps;
          } else {
            if (operate === "add") {
              return { ...reps, vote: reps.vote + 1 };
            } else {
              return { ...reps, vote: reps.vote - 1 };
            }
          }
        });
        return { ...coms, replies: newCom };
      }
    });

    dispatch({ type: SETCOMMENT, payload: newComment });
    storeComment(newComment);
  };

  const editComment = (commId, text) => {
    const comm = state.comment.find((com) => com.id === commId);
    let newComment = state.comment.map((coms) => {
      if (coms !== comm) {
        return coms;
      } else {
        return { ...coms, content: text };
      }
    });
    dispatch({ type: SETCOMMENT, payload: newComment });
    storeComment(newComment);
  };

  const editReply = (commId, repId, text) => {
    const comm = state.comment.find((com) => com.id === commId);
    const reply = comm.replies.find((rep) => rep.id === repId);

    const newComment = state.comment.map((coms) => {
      if (coms !== comm) {
        return coms;
      } else {
        const newCom = coms.replies.map((reps) => {
          if (reps !== reply) {
            return reps;
          } else {
            return { ...reps, content: text };
          }
        });
        return { ...coms, replies: newCom };
      }
    });

    dispatch({ type: SETCOMMENT, payload: newComment });
  };

  const values = {
    comm: state.comment,
    addComment: addComment,
    diff: diffTime,
    addReply: inputReply,
    addVote: addVote,
    addReplyVote: addVoteReply,
    editComment: editComment,
  };

  return (
    <CommentContext.Provider value={values}>
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommenState;
