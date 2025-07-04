import React, { useState } from "react";
import BlogCard from "../BlogCard/BlogCard";

import api from "../../axios";

const BlogList = () => {

    const [blogs, setBlogs] = useState([])

    useState(() => {
        (async () => {
            const response = await api.get('/post/posts')
            const blogsData = response.data.data

            setBlogs(blogsData)
            
        })()
    }, [])
if (blogs.length === 0) {
    return (
        <div className="flex items-center justify-center h-64">
        <h1 className="text-xl text-gray-500 font-medium">
            No blogs yet. 📝
        </h1>
        </div>
    );
    }

    return ( 
        <div className="min-h-screen bg-white px-4 py-12 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-600 mb-10">Latest Blog Posts</h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((post) => (
            <BlogCard key={post._id} post={post} />
            ))}
        </div>
        </div>
    );
    };

export default BlogList;
