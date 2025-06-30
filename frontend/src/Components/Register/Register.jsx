import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Upload , Camera } from "lucide-react"
import axios from "axios"
import { Loading } from "../utils/Loading/Loading";
import { Error } from "../utils/Error/Error";
import { Success } from "../utils/Success/Success";
import defaultAvatar from "../../assets/default-avatar.png";
import defaultCoverImage from "../../assets/default-coverImage.avif"

export default function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [bio, setBio] = useState("")

    const [avatar, setAvatar] = useState("")
    const [coverImage, setCoverImage] = useState("")
    const [avatarPreview, setAvatarPreview] = useState("https://avatars.githubusercontent.com/u/583231?v=4")

    const [coverPreview, setCoverPreviw] = useState("https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1000&q=80")

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [registered, setRegistered] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")


    useEffect(() => {
        const loadDefaults = async () => {

            //! to Convert a url image to a file

            const fetchAsFile = async (url, name) => {
            const res = await fetch(url); 
            const blob = await res.blob(); //* coverted the url image into a binary blob
            return new File([blob], name, { type: blob.type }); //* converted that blob to file
            };

            //* created those files

            const avatarFile = await fetchAsFile(
            "https://avatars.githubusercontent.com/u/583231?v=4",
            "avatar.png"
            ); 

        

            const coverFile = await fetchAsFile(
            "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1000&q=80",
            "cover.png"
            );

            setAvatar(avatarFile); // ✅ actual File object now
            setCoverImage(coverFile);
            setAvatarPreview(URL.createObjectURL(avatarFile));
            setCoverPreviw(URL.createObjectURL(coverFile));
        };

        loadDefaults();
}, []);

    
    const handleAvatarChange = (e) => {
        console.log(avatarPreview)
        const file = e.target.files[0];
        if (file) {
            setAvatar(file)
            setAvatarPreview(URL.createObjectURL(file));
        }
    };
    
    const handleCoverChange = (e) => {
        const file = e.target.files[0]
        
        if (file) {
            setCoverImage(file)
            setCoverPreviw(URL.createObjectURL(file));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        // Reset state
        setError(false);
        setRegistered(false);
        setLoading(true);

        
        try {

            formData.append("username", username)
            formData.append("email", email)
            formData.append("password",password)
            formData.append("bio", bio)
            formData.append("avatar" , avatar)
            formData.append("coverImage", coverImage)

            const response = await axios.post("/api/v1/users/register", formData);

            setRegistered(true)

        } catch (err) {
            // Always handle error fields safely
            const msg =
            err?.response?.data?.message ||
            err?.message ||
            "Something went wrong.";
            setError(true);
            setErrorMessage(msg);
        } finally {
            // Always ends the loading
            setLoading(false);
        }
};

    
return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Cover Image Section */}
        <div className="relative h-40 bg-gray-200 group">
            <label htmlFor="cover-upload" className="cursor-pointer absolute inset-0 z-10">
            <img
                src={coverPreview}
                alt="Cover Preview"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <Camera className="text-white w-6 h-6" />
            </div>
            </label>
            <input
            id="cover-upload"
            type="file"
            accept="image/*"
            className="hidden"
            name="coverImage"
            onChange={handleCoverChange}
            />
        </div>

        {/* Avatar */}
        <div className="relative flex justify-center -mt-12 z-20">
            <label htmlFor="avatar-upload" className="relative group cursor-pointer">
            <img
                src={avatarPreview}
                alt="Avatar"
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <Camera className="text-white w-5 h-5" />
            </div>
            </label>
            <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            name="avatar"
            onChange={handleAvatarChange}
            />
        </div>

        {/* Form Section */}

        {loading && <Loading />}
        {error && <Error message={errorMessage}/>}
        {registered && <Success message="User registered successfully , Please Log In"/> }
        <div className="px-6 pt-6 pb-8 space-y-6">
            <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-700">Create Your Account</h2>
            <p className="text-sm text-gray-500 mt-1">
                Join Inkspire and start sharing your voice
            </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm text-gray-700 mb-1">Username</label>
                <input
                type="text"
                name="username"
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio (optional)</label>
                <textarea
                name="bio"
                rows="3"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Tell us a little about yourself..."
                onChange={(e) => setBio(e.target.value)}
                />
            </div>

            

            <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm text-gray-700 mb-1">Password</label>
                <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
                Sign Up
            </button>
            </form>

            <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
                Log in
            </Link>
            </p>
        </div>
        </div>
    </div>
    );

}
