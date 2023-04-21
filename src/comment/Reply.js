import { useContext } from "react";
import CommentContext from "./Context/Comment/CommentContext";

const Reply = ({ reply, comment }) => {
  const commentCon = useContext(CommentContext);
  const { addReplyVote } = commentCon;

  return (
    <div className="grid grid-cols-comment p-4 bg-white rounded-lg gap-4 justify-start w-reply ml-12 mb-2">
      <div className="flex flex-col w-8 p-2 gap-3 bg-lightGray rounded-md h-fit items-center text-sm">
        <img
          src="images/icon-plus.svg"
          alt=""
          className="cursor-pointer"
          onClick={() => addReplyVote(comment.id, reply.id, "add")}
        />
        <div className="main_score">{reply.vote}</div>
        <img
          src="images/icon-minus.svg"
          alt=""
          className="cursor-pointer"
          onClick={() => addReplyVote(comment.id, reply.id, "sub")}
        />
      </div>
      <div className="comm_part">
        <div className="comm_top flex justify-between w-full items-center mb-2">
          <div className="flex gap-4 text-xs items-center">
            <img src={reply.image.png} alt="" className="w-8" />
            <div className="name font-bold">{reply.name}</div>
            <div className="time text-lightGreyishBlue text-xs">
              1 month ago
            </div>
          </div>
          <div className="rep flex text-xs gap-3 items-center text-moderateBlue">
            <img src="images/icon-reply.svg" alt="" />
            <div className="reply">Reply</div>
          </div>
        </div>
        <div className="main_comment text-grayishBlue text-xs">
          {reply.content}
        </div>
      </div>
    </div>
  );
};

export default Reply;
