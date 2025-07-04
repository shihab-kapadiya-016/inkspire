import React, { useEffect, useState } from "react";
import api from "../../axios";
import CommentList from "../CommentList/CommentList";
import RepliesViewer from "../RepliesViewer/RepliesViewer";

const CommentSection = ({ postId, handleDelete, setPost }) => {
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([])

    useEffect(() => {
        (async () => {
            const commentResponse = await api.get(`comment/get-comments/${postId}`)
            const commentsData = commentResponse.data.data
            setComments(commentsData)
        })()
    },[postId, newComment])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const commentPostResponse = await api.post(`/comment/post-comment/${postId}`, {content: newComment})
    
        setNewComment("");

        const res = await api.get(`/post/get-post-by-id/${postId}`)
        const postData = res.data.data

        console.log(postData);
        setPost(postData)
    };

    return (
        <div className="border-t pt-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">Comments</h2>

        {/* Add Comment Form */}
        <form onSubmit={handleSubmit} className="mb-6">
            <textarea
            className="w-full border border-blue-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            />
            <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
            >
            Post Comment
            </button>
        </form>

        {/* Comment List */}
        <CommentList comments={comments} setComments={setComments} postId={postId} handleDelete={handleDelete}/>
        
        </div>
    );
};

export default CommentSection;
