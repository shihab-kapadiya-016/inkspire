import React, { useEffect, useState } from 'react'
import { MessageCircle , Heart , Clock, Trash2 } from 'lucide-react'
import api from '../../axios'
import ReplyComponent from '../ReplyComment/ReplyComment'
import RepliesViewer from '../RepliesViewer/RepliesViewer'

function CommentList({ comments = [] ,  setComments , postId, handleDelete  }) {
    
    const [authors , setAuthors] = useState([])
    const [currentUser , setCurrentUser] = useState({})
    const [activeReplyId, setActiveReplyId] = useState(null)
    const [commentReplies, setCommentReplies] = useState({})


    useEffect(() => {
        const fetchReplies =  async () => {
            const repliesMap = {}
            try {
                for(const comment of comments) {
                    const response = await api.get(`/comment/get-replies/${comment._id}`)
                    repliesMap[comment._id] =  response.data.data || [] 
                }
            } catch (error) {
                console.error("Failed to fetch replies", error)
            }

            setCommentReplies(repliesMap)
        }

        if(comments.length > 0) {
            fetchReplies()
        }
    },[comments])

    const fetchAuthor = async (comment) => {
        const response = await api.get(`/users/get-user-by-id/${comment.authorId}`)
        // console.log(response)
        return response.data.data
    }

    useEffect(() => {
        ;(async () => {
            const result = await Promise.all(
                comments.map((comment) => fetchAuthor(comment))
            )
            setAuthors(result)
            // console.log(result)
        })()
    }, [comments])

    // console.log(authors)

    const fetchCurrentUser = async () => {
        const response = await api.get('/users/User')

        return response.data.data
    }

    useEffect(() => {
        ;(async () => {
            const result = await fetchCurrentUser()
            
            //console.log(result)
            setCurrentUser(result)
        })()
    }, [])

    const handleLike = async (commentId) => {
        try {
            await api.patch(`/comment/toggle-like/${commentId}`);

            const response  = await api.get(`/comment/get-comments/${postId}`)
            const commentsData = response.data.data

            setComments(commentsData)

        } catch (err) {
            console.error("Like failed", err);
        }
    }

    const onReplySuccess = async (parentId, newReply) => {
        setCommentReplies((prev) => ({
            ...prev,
            [parentId]: [...(prev[parentId] || []) , newReply]
        }));
    }

    const onDeleteReply = (parentId, replyId) => {

        setCommentReplies((prev) => ({
            ...prev, 
            [parentId]: prev[parentId].filter((reply) => reply._id !== replyId)
        }))

    }

    
    
    return (
        <div className="space-y-4">
        {comments.length === 0 || !Array.isArray(comments) ? (
            <div className="text-center text-gray-500">No comments yet.</div>
        ) : (
            comments.map((comment) => {
            const author = authors.find((a) => a._id === comment?.authorId);

            return (
                <div
                key={comment?._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 transition hover:shadow-md"
                >
                <div className="flex justify-between items-start">
                {/* Left side: Avatar + Name + Content */}
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                    <img
                        src={author?.avatar}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <h4 className="text-base font-semibold text-gray-900">
                        {author?.username || "Unknown"}
                    </h4>
                    </div>

                    <p className="text-sm text-gray-700 mt-2 ml-12">{comment?.content}</p>
                </div>

                        {/* Right side: Timestamp & Delete */}
                    <div className="flex flex-col items-end gap-2">
                        <div className="text-gray-400 text-xs flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{new Date(comment?.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    {/* Trash icon: show only if current user is the author */}
                    {currentUser?._id === comment?.authorId && (
                        <button
                        onClick={() => handleDelete(comment._id, setComments)}
                        className="text-red-500 hover:text-red-600 transition"
                        title="Delete comment"
                        >
                        <Trash2 className="w-4 h-4 cursor-pointer" />
                        </button>
                    )}
                    </div>
                </div>

                <div className="mt-3 space-y-2 text-sm text-gray-500">
                    {/* Like + Reply Row */}
                    <div className="flex items-center gap-4">
                        <button
                        onClick={() => handleLike(comment?._id)}
                        className="flex items-center gap-1 group"
                        >
                        <Heart
                            className={`w-4 h-4 mt-0.5 transition-all duration-100 cursor-pointer ${
                            comment?.likes.includes(currentUser._id)
                                ? "fill-blue-600 text-blue-600"
                                : "text-gray-400 group-hover:text-blue-500"
                            }`}
                        />
                        <span>{comment?.likes?.length || 0}</span>
                        </button>

                        <button
                        onClick={() =>
                            setActiveReplyId(activeReplyId === comment._id ? null : comment._id)
                        }
                        className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition cursor-pointer"
                        >
                        <MessageCircle className="w-4 h-4" />
                        <span>Reply</span>
                        </button>
                    </div>

                    {/* ReplyComponent (rendered below the actions) */}
                    {activeReplyId === comment._id && (
                        <ReplyComponent
                        commentId={comment._id}
                        parentId={comment._id}  
                        onReplySuccess={(newReply) => onReplySuccess(comment._id, newReply)}
                        />
                    )}

                    {comment.replies}
                </div>
                <RepliesViewer 
                parentId={comment._id} 
                currentUser={currentUser}
                replies={commentReplies[comment._id || []]}
                onDeleteReply={onDeleteReply}   
                />

                </div>

                
            );
            })
        )}
        </div>
    );
}
export default CommentList