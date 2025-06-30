import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
    


    return (
        <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition bg-white">
        {post.thumbnail && (
            <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-48 object-cover"
            />
        )}
        <div className="p-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
            <Link to={`/blogs/${post._id}`} className="hover:text-orange-600">
                {post.title}
            </Link>
            </h2>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">{post.summary}</p>
            <div className="text-sm text-gray-500">
            By {post.authorId} • {post.date}
            </div>
        </div>
        </div>
    );
};

export default BlogCard;
