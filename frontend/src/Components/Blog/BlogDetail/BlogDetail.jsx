import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Heart, MessageCircle ,User } from "lucide-react";
import CommentSection from "../CommentSection/CommentSection";
import api from "../../axios";

const BlogDetail = () => {

    const { id } = useParams()

    const [post,setPost] = useState({})
    const [user, setUser] = useState(null)
    const [isLiked, setIsLiked] = useState()
    const [currentUser, setaCurrentUser] = useState({})

    useEffect(() => {
        (async () => {
            const postResponse = await api.get(`/post/get-post-by-id/${id}`)
            const postData = postResponse.data.data

            const userResponse = await api.get(`/users/get-user-by-id/${postData.authorId}`)
            const userData = userResponse.data.data

            const currentUserRes = await api.get(`/users/User`)
            const currentUserData = currentUserRes.data.data

            setPost(postData)
            setUser(userData)
            setaCurrentUser(currentUserData)

            console.log(postData)
            
            
            setIsLiked(postData?.likes?.includes(currentUserData._id))
            
        })()
    }, [id])

    

    const handleLike = async () => {
        await api.put(`/post/toggle-likes/${id}`)


        const postResponse = await api.get(`/post/get-post-by-id/${id}`)
        const postData = postResponse.data.data
        setPost(postData)
        setIsLiked(postData.likes.includes(currentUser?._id))

    }

    const handleDelete = async (commentId, setComments ) => {
        try {
            await api.delete(`/comment/delete-comment/${commentId}`)

            const response  = await api.get(`/comment/get-comments/${id}`)
            const commentsData = response.data.data

            const res = await api.get(`/post/get-post-by-id/${id}`)
            const postData = res.data.data

            setPost(postData)
    
            setComments(commentsData)
            
        } catch (error) {
            console.error("Error while deleting comment", error)
        }
    }


    return (
        <div className="min-h-screen bg-white px-4 py-12 max-w-3xl mx-auto">
        {post.thumbnail && (
            <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-64 object-cover rounded-2xl mb-8 shadow"
            />
        )}

        <h1 className="text-4xl font-bold text-blue-800 leading-tight mb-3">
            {post.title}
        </h1>

        <div className="flex items-center text-gray-500 text-sm mb-6 gap-2">
            <User className="w-4 h-4" />
            <span>{user?.username}</span>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center gap-6 mb-8 text-blue-700 text-sm font-medium">
            <div className="flex items-center gap-1">
            <button className="w-5 h-5 cursor-pointer" onClick={handleLike}>
            <Heart
                className="w-full h-full transition-all duration-150"
                style={{
                stroke: isLiked ? "#2563eb" : "#94a3b8", // blue-600 or slate-400
                fill: isLiked ? "#2563eb" : "transparent",
                }}
                strokeWidth={2}
            />
            </button>            
            
            <span>{post.likes?.length || 0} Likes</span>
            </div>
            <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{post?.commentIds?.length || 0} Comments</span>
            </div>
        </div>

        <div className="prose prose-lg max-w-none text-gray-800 mb-12">
            {post.description}
        </div>

        <CommentSection postId={id} handleDelete={handleDelete} setPost={setPost} />
        </div>
    );
};

export default BlogDetail;

