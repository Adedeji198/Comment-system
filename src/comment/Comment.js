import { useContext, useRef, useState } from "react";
import CommentContext from "./Context/Comment/CommentContext";
import Reply from "./Reply";

const Comment = ({ comment }) => {
  const [replyText, setReplyText] = useState("");
  const [showRely, setShowReply] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editText, setEditText] = useState(comment.content);

  const commentCon = useContext(CommentContext);

  const { addReply, addVote, editComment } = commentCon;

  const replyRef = useRef();

  const submitReply = () => {
    if (replyText === "") {
      alert("Reply input cannot be empty");
    } else {
      addReply(comment.id, replyText);
      setReplyText("");
      setShowReply(false);
      replyRef.current.value = "";
    }
  };

  const updateContent = () => {
    if (editText === "") {
      alert("Input cannot be empty");
    } else {
      editComment(comment.id, editText);
      setShowEdit(false);
    }
  };

  return (
    <div className="comment my-2 ">
      <div className="p-4 bg-white rounded-lg justify-start mb-3 grid grid-cols-comment gap-4">
        <div className="flex flex-col w-8 p-2 gap-3 bg-lightGray rounded-md h-fit col-span-1 items-center text-sm">
          <img
            src="images/icon-plus.svg"
            alt=""
            onClick={() => addVote(comment.id, "add")}
            className="cursor-pointer"
          />
          <div className="main_score">{comment.vote}</div>
          <img
            src="images/icon-minus.svg"
            alt=""
            onClick={() => addVote(comment.id, "-")}
            className="cursor-pointer"
          />
        </div>
        <div className="comm_part">
          <div className="comm_top flex justify-between w-full items-center mb-2">
            <div className="flex gap-2 text-xs items-center">
              <img src={comment.image.png} alt="" className="w-8" />
              <div className="name font-bold">{comment.name}</div>
              {comment.fromMe ? (
                <div className="text-white bg-moderateBlue p-you">you</div>
              ) : (
                ""
              )}
              <div className="time text-lightGreyishBlue">1 month ago</div>
            </div>
            {comment.fromMe ? (
              <div className="flex text-xs gap-3">
                <div className="delete flex items-center gap-1 cursor-pointer">
                  <img src="images/icon-delete.svg" alt="" />
                  <div className="text-softRed">Delete</div>
                </div>
                <div
                  className="delete flex items-center gap-1 cursor-pointer"
                  onClick={() => setShowEdit(true)}
                >
                  <img src="images/icon-edit.svg" alt="" />
                  <div className="text-moderateBlue">Edit</div>
                </div>
              </div>
            ) : (
              <div
                className="rep flex text-xs gap-3 items-center text-moderateBlue cursor-pointer"
                onClick={() => setShowReply(true)}
              >
                <img src="images/icon-reply.svg" alt="" />
                <div className="reply">Reply</div>
              </div>
            )}
          </div>
          <div
            className={`main_comment text-grayishBlue text-xs ${
              showEdit ? "hidden" : ""
            }`}
          >
            {comment.content}
          </div>
          <div className={`edit_part text-end ${!showEdit ? "hidden" : ""}`}>
            <textarea
              name=""
              id=""
              className="w-full min-h-[4rem]"
              defaultValue={comment.content}
              onChange={(e) => setEditText(e.target.value)}
            ></textarea>
            <button
              className="uppercase bg-moderateBlue text-white px-3 py-2 rounded-md text-sm font-bold"
              onClick={updateContent}
            >
              Update
            </button>
          </div>
        </div>
      </div>
      {/* REPLIES */}
      <div className="replies">
        {comment.replies.length > 0
          ? comment.replies.map((reply) => (
              <Reply key={reply.id} reply={reply} comment={comment} />
            ))
          : ""}
      </div>
      <div className={`${showRely ? "" : "hidden"}`}>
        <div className=" flex items-start gap-4 bg-white p-4 rounded-lg">
          <img
            src="images/avatars/image-amyrobson.png"
            alt=""
            className="w-8"
          />
          <textarea
            name=""
            id=""
            cols="36"
            rows="4"
            onChange={(e) => setReplyText(e.target.value)}
            ref={replyRef}
          ></textarea>
          <button
            className="send bg-moderateBlue py-2 px-4 rounded-md text-white"
            onClick={submitReply}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
