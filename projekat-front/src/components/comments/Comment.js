import CommentForm from "./CommentForm";
import userimg from "../../assets/images/user-icon.png";
function Comment({
  comment,
  replies,
  loggedIn,
  deleteHandler,
  addComment,
  activeComment,
  setActiveComment,
  updateComment,
  parentId = null,
}) {
  const canReply = Boolean(window.sessionStorage.getItem("auth_token"));
  const canEdit = loggedIn === true;
  const canDelete = loggedIn === true;
  const createdAt = new Date(comment.created_at).toLocaleDateString();
  const isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === comment.id;
  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment.id;
  const replyId = parentId ? parentId : comment.id;
  //console.log(canEdit + comment.username);
  return (
    <div className="comment">
      <div className="comment-img-container">
        <img src={userimg} alt="user img"></img>
      </div>
      <div className="comment-right-part">
        <div className="comment-content-single">
          <div className="comment-author">{comment.username}</div>
          <div className="date">{createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLable="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancle={(e) => {
              e.preventDefault();
              setActiveComment(null);
            }}
          ></CommentForm>
        )}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteHandler(comment.id)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLable="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}

        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                replies={[]}
                loggedIn={loggedIn}
                updateComment={updateComment}
                addComment={addComment}
                parentId={comment.id}
                deleteHandler={deleteHandler}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
              ></Comment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
