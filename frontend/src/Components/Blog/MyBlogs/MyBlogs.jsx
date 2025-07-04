import PostCard from "../../PostCard/PostCard";
import { FileText, Plus } from "lucide-react";
import {Link } from "react-router-dom"
import axios from "axios";

const MyBlogs = ({ posts, setPosts }) => {

    const onDelete = async (id) => {
        await axios.delete(`/api/v1/post/delete-post/${id}`)
        
        setPosts((prev) => prev.filter((post)=> post._id !== id))
        
    }
    
    
    return (
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Your Posts
                </h3>
                <Link
                to="/dashboard/create"
                className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-1 text-sm"
                >
                <Plus className="w-4 h-4" />
                New Post
                </Link>
            </div>

            <div className="space-y-3">
                {Array.isArray(posts) && posts.length > 0 ? (
                        posts
                        .filter(Boolean)
                        .map((post) => (
                            <PostCard key={post?._id} post={post} onDelete={onDelete} />
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">You haven’t posted anything yet.</p>
                    )}
            </div>
        </div>
    );
    };

export default MyBlogs;
