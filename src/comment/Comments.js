import { useContext, useRef, useState } from "react";
import Comment from "./Comment";
import CommentContext from "./Context/Comment/CommentContext";
const Comments = () => {
  const [commentText, setCommentText] = useState("");
  const commentRef = useRef();
  const commentCon = useContext(CommentContext);
  const { addComment, comm } = commentCon;

  const submitComment = () => {
    if (commentText === "") {
      alert("Comment cannot be empty");
    } else {
      addComment(commentText);
      commentRef.current.value = "";
      setCommentText("");
    }
  };

  return (
    <div className="w-2rem mx-auto pt-2">
      <main className="">
        {comm.length > 0 ? (
          comm.map((comment) => <Comment key={comment.id} comment={comment} />)
        ) : (
          <div className="text-gray-400 font-bold my-12 text-center">
            No Comment
          </div>
        )}
      </main>
      <div className="input_part w-full h-36">
        <div className="fixed flex items-start gap-4 bg-white p-4 rounded-lg bottom-0">
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
            onChange={(e) => setCommentText(e.target.value)}
            ref={commentRef}
          ></textarea>
          <button
            className="send bg-moderateBlue py-2 px-4 rounded-md text-white"
            onClick={submitComment}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
