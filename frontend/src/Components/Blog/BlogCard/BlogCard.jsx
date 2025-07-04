import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../axios";

const BlogCard = ({ post }) => {

    const [author , setAuthor] = useState({})


    useEffect(() => {
        ;(async () => {
            const response = await api.get(`/users/get-user-by-id/${post.authorId}`)
            const authorData = response.data.data

            setAuthor(authorData)
        })()
    }, [])

    const splitTitle  = (title) => {
        const words = title.split(" ")
        const chunksize = Math.ceil(words.length / 3)

        return [
            words.slice(0, chunksize).join(" ") , 
            words.slice(chunksize, chunksize * 2).join(" "), 
            words.slice(chunksize * 2).join(" ")
        ]
    }
    


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
            
        <h3 className="text-lg font-semibold text-gray-800 leading-tight space-y-1">
            <Link to={`/blogs/${post._id} `}>
                {splitTitle(post.title).map((line, idx) => (
                <span key={idx} className="block">
            {line}
        </span>
            ))}
            </Link>
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">{post.summary}</p>
            <div className="text-sm text-gray-500">
            By {author?.username} • { new Date(post.createdAt).toLocaleDateString()}
            </div>
        </div>
        </div>
    );
};

export default BlogCard;

