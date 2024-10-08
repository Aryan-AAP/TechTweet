import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";

const Post = ({ post }) => {
  const currentUserId = window.localStorage.getItem("id");
  var isMyPost = post.user_id == currentUserId;

  const [user, setUser] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);

  useEffect(() => {
    // console.log(post.liked_by.includes(currentUserId));
    // setIsLiked(post.liked_by.includes(currentUserId));
    const liked_by = post.liked_by;
    console.log(liked_by);
    setIsLiked(liked_by.includes(currentUserId));
  }, []);

  const handleDeletePost = () => {
    if (post.user_id == window.localStorage.getItem("id")) {
      console.log("Delete");
      if (confirm("Do you want to delete post?")) {
        api.delete(`/post/delete/${post._id}`).then((res) => {
          alert(res.data);
        });
      }
    }
  };

  const handlePostComment = (e) => {
    e.preventDefault();
  };
  const handleLikePost = async () => {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(true);
      await api
        .post(`/post/like/${post._id}`, { user_id: currentUserId })
        .then((res) => {
          if (res.status != 200) {
            setLikes(likes - 1);
          }
        });
    } else {
      if (likes >= 1) {
        setLikes(likes - 1);
        setIsLiked(false);
      }
      await api
        .post(`/post/unlike/${post._id}`, { user_id: currentUserId })
        .then((res) => {
          if (res.status != 200) {
            setLikes(likes + 1);
          }
        });
    }
  };
  useEffect(() => {
    api.get(`/user/${post.user_id}`).then((res) => {
      setUser(res.data);
    });
  }, []);


  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment) return;

    try {
      const response = await api.post(`/post/comment/${post._id}`, {
        user_id: currentUserId,
        comment: newComment,
      });
      
      if (response.status === 200) {
        setComments([...comments, { user_id: currentUserId, comment: newComment }]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };



  return (
    <>
      <div className="flex gap-2 items-start p-4 border-b border-gray-700 md: w-[500px] lg:w-[500px]">
        <div className="avatar">
          <Link
            to={`/profile`}
            className="w-8 rounded-full overflow-hidden"
          >
            <img src={user.profile_pic || "/avatar-placeholder.png"} />
          </Link>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-2 items-center">
            <Link to={`/profile`} className="text-lg font-bold">
              {user.name}
            </Link>
            <span className="text-gray-700 flex gap-2 text-sm">
              <Link to={`/profile`} className="text-md">
                @{user.email}
              </Link>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </span>
            {isMyPost && (
              <span className="flex justify-end flex-1">
                <FaTrash
                  className="cursor-pointer hover:text-red-500"
                  onClick={handleDeletePost}
                />
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3 ">
            <div className="overflow-x-hidden text-ellipsis text-clip line-clamp-1">
              {post.caption}
            </div>
            {post.photos && (
              <img
                src={post.photos}
                className="h-80 object-contain rounded-lg border border-gray-700"
                alt="phoyo"
              />
            )}
          </div>
          <div className="flex justify-between mt-3">
            <div className="flex gap-4 items-center w-2/3 justify-between">
              {/* <div
                className="flex gap-1 items-center cursor-pointer group"
                onClick={() =>
                  document
                    .getElementById("comments_modal" + post._id)
                    .showModal()
                }
              >
                <FaRegComment className="w-4 h-4  text-slate-500 group-hover:text-sky-400" />
                <span className="text-sm text-slate-500 group-hover:text-sky-400">
                  {post.comments.length}
                </span>
              </div> */}
              {/* We're using Modal Component from DaisyUI */}
              {/* <dialog
                id={`comments_modal${post._id}`}
                className="modal border-none outline-none"
              >
                <div className="modal-box rounded border border-gray-600">
                  <h3 className="font-bold text-lg mb-4">COMMENTS</h3>
                  <div className="flex flex-col gap-3 max-h-60 overflow-auto">
                    {post.comments.length === 0 && (
                      <p className="text-sm text-slate-500">
                        No comments yet 🤔 Be the first one 😉
                      </p>
                    )}
                    {post.comments.map((comment) => (
                      <div key={comment._id} className="flex gap-2 items-start">
                        <div className="avatar">
                          <div className="w-8 rounded-full">
                            <img
                              src={
                                // comment.user.profile_pic ||
                                "/avatar-placeholder.png"
                              }
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <span className="font-bold">
                              {comment.user.name}
                            </span>
                            <span className="text-gray-700 text-sm">
                              @{comment.user.email}
                            </span>
                          </div>
                          <div className="text-sm">{comment.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form
                    className="flex gap-2 items-center mt-4 border-t border-gray-600 pt-2"
                    onSubmit={handlePostComment}
                  >
                    <textarea
                      className="textarea w-full p-1 rounded text-md resize-none border focus:outline-none  border-gray-800"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="btn btn-primary rounded-full btn-sm text-white px-4">
                      {isCommenting ? (
                        <span className="loading loading-spinner loading-md"></span>
                      ) : (
                        "Post"
                      )}
                    </button>
                  </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button className="outline-none">close</button>
                </form>
              </dialog> */}
              {/* <div className="flex gap-1 items-center group cursor-pointer">
                <BiRepost className="w-6 h-6  text-slate-500 group-hover:text-green-500" />
                <span className="text-sm text-slate-500 group-hover:text-green-500">
                  0
                </span>
              </div> */}
              <div
                className="flex gap-1 items-center group cursor-pointer"
                onClick={handleLikePost}
              >
                {!isLiked && (
                  <FaRegHeart className="w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500" />
                )}
                {isLiked && (
                  <FaRegHeart className="w-4 h-4 cursor-pointer text-pink-500 " />
                )}

                <span
                  className={`text-sm text-slate-500 group-hover:text-pink-500 ${
                    isLiked ? "text-pink-500" : ""
                  }`}
                >
                  {likes}
                </span>
              </div>
            </div>
          </div>
            {/* Comments Section */}
      <div className="mt-4">
        <h4 className="text-lg font-semibold">Comments:</h4>
        <ul className="list-disc pl-5">
          {comments.map((comment, index) => (
            <li key={index} className="text-gray-700 mt-1">{comment.comment}</li>
          ))}
        </ul>

        <form onSubmit={handleCommentSubmit} className="mt-2 flex">
          <input
            type="text"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
            className="border rounded-l-md p-2 flex-1"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 rounded-r-md">Post</button>
        </form>
      </div>
        </div>
      </div>
    </>
  );
};
export default Post;
