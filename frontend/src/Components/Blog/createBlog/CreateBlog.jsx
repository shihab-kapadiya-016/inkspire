import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loading } from "../../utils/Loading/Loading";
import { Error } from "../../utils/Error/Error";
import { Success } from "../../utils/Success/Success";

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [thumbnail, setThumbnail] = useState()
    const [preview , setPreview] = useState()


    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage , setErrorMessage ] = useState(" ")
    const [suceess , setSuccess] = useState(false)

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0]

        if(file) {
            setThumbnail(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(false)
            setLoading(true)
            const formData = new FormData()
            formData.append("title", title)
            formData.append("description", content)
            formData.append("thumbnail", thumbnail)

        const response = await axios.post("/api/v1/post/create-post", formData);
        setSuccess(true)
        console.log(response)
        // navigate("/blogs");
        } catch (error) {
            setError(true)
            console.error("Blog creation failed:", error.response?.data || error.message);
            setErrorMessage(error.response?.data?.errors)
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Create New Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
            <div className="mb-6 text-center">
            {preview ? 
            <img
            src={preview}
            alt="Thumbnail Preview"
            className="mx-auto rounded-xl border border-gray-300 shadow-sm max-h-64 object-cover"
            /> 
            : 
            <h1 className="text-gray-500 text-lg italic">Please add the thumbnail</h1> }
            </div>
                {loading && <Loading />}
                {error && <Error message={errorMessage}/>}
                {suceess && <Success message="Blog Posted Successfully"/>}

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Blog Thumbnail
            </label>
            <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-700
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-600
                hover:file:bg-blue-100
                cursor-pointer"
            />
        </div>

            <input
            type="text"
            placeholder="Blog Title"
            className="w-full px-4 py-2 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            />
            <textarea
            placeholder="Write your blog content here..."
            className="w-full px-4 py-2 border rounded-md h-60"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            />
            <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
            Publish Blog
            </button>
        </form>
        </div>
    );
    };

export default CreateBlog;
