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

    const onAddComment = () => {}

    useEffect(() => {
        (async () => {
            const postResponse = await api.get(`/post/get-post-by-id/${id}`)
            const postData = postResponse.data.data

            const userResponse = await api.get(`/users/get-user-by-id/${postData.authorId}`)
            const userData = userResponse.data.data

            setPost(postData)
            setUser(userData)
            
            setIsLiked(postData.likes.includes(userData._id))
            
        })()
    }, [])

    

    const handleLike = async () => {
        const response = await api.put(`/post/toggle-likes/${id}`)
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
            <button className="w-5 h-5" onClick={handleLike}>
                <Heart className= {`w-full h-full cursor-pointer transition-colors duration-150  ${isLiked ? "fill-blue-600 text-blue-600" : "text-blue-600"}`} />
            </button>
            
            <span>{post.likes?.length || 0} Likes</span>
            </div>
            <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments?.length || 0} Comments</span>
            </div>
        </div>

        <div className="prose prose-lg max-w-none text-gray-800 mb-12">
            {post.content}
        </div>

        <CommentSection postId={id} user={user} />
        </div>
    );
};

export default BlogDetail;

