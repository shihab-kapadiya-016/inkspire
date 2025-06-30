import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import api from "../../axios";


const EditBlog = () => {
    const [post, setPost] = useState({})
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [preview, setPreview] = useState(null);

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const { id } = useParams()

    
    useEffect(() => {
        ( async () => {
            try {
                const response = await axios.get(`/api/v1/post/get-post-by-id/${id}`)
                const postData = response.data.data

                setPost(postData)
                setTitle(postData?.title || "")
                setContent(postData?.description || "")
                setThumbnail(postData.thumbnail)
                setPreview(postData.thumbnail || "")
                console.log(postData?.thumbnail)
            
            } catch (error) {
                console.log(error)    
            }
            
        })
    ()

    }, [id])
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setError(false)
            setLoading(true)

            const formData = new FormData()
            
            formData.append("title", title)
            formData.append("description", content)
            formData.append("thumbnail", thumbnail)
            
            const response = await api.put(`/post/update-post/${id}`, formData)     
            console.log(response)

        } catch (error) {
            setError(true)
            console.error(error.response?.data)

        } finally{
            setLoading(false)
        }
    }



    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setThumbnail(file);
        setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10 space-y-6">
        <h2 className="text-2xl font-semibold text-blue-700">Edit Post</h2>

        <div className="space-y-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your post title"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Write your post content here..."
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail</label>
            {preview && (
                <img
                src={preview}
                alt="Thumbnail Preview"
                className="w-full max-h-64 object-cover rounded-md mb-3 border"
                />
            )}
            <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="block w-full text-sm text-gray-700
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-600
                hover:file:bg-blue-100 cursor-pointer"
            />
            </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
            <button className="px-4 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
            Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
            Update Post
            </button>
        </div>
        </form>
    );
    };

export default EditBlog;
