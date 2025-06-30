import axios from "axios";
import { Mail, User, Edit3, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import UserCard from "../UserCard/UserCard";
import AccountSettings from "../AccountSettings/AccountSettings";
import {useDispatch, useSelector} from 'react-redux'
import { loginSuccess } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import MyBlogs from "../Blog/MyBlogs/MyBlogs";

export default function Dashboard() {
    
    const [avatarPreview, setAvatarPreview] = useState(null)
    const [coverPreview , setCoverPreview] = useState(null)

    const [user, setUser] = useState(null)

    const [posts, setPosts] = useState([])

    
    const handleAvatarChange = () => {}
    const handleCoverChange = () => {}

    const dispatch = useDispatch()
    
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const stateUser = useSelector((state) => state.auth.user)

    const onDelete = async () => {
        try {
            const response = await axios.post(`delete-post/`)
        } catch (error) {
            console.error("Fetch error:", error.response?.data || error.message);

        }
    }


    useEffect(() => {
        ;( async () => {
            try {
                const response = await axios.get('/api/v1/users/User');
                const userData = response.data.data;

                setUser(userData);

                setAvatarPreview(userData.avatar);
                setCoverPreview(userData.coverImage);

                dispatch(loginSuccess(userData))

                const res = await axios.get('/api/v1/post/get-posts-of-user')
                const postsData = res.data.data
                
                setPosts(postsData)
                
        } catch (error) {
            console.error("Fetch error:", error.response?.data || error.message);
    }})()
    }, []) 



    
    if(!isLoggedIn) {
        return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">You need to Login to access the dashboard.</p>
            <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
            Login
            </Link>
        </div>
    );
    }


    return (
        <div className="min-h-screen bg-blue-50 px-4 py-10 text-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* User Profile Card */}
            <UserCard 
            avatarPreview={avatarPreview}
            coverPreview={coverPreview}
            handleAvatarChange={handleAvatarChange}
            handleCoverChange={handleCoverChange}
            user={user}
/>

            {/* Settings & Posts */}
            <div className="md:col-span-2 space-y-6">
            {/* Settings */}
            <AccountSettings />

            {/* User Posts */}
            <MyBlogs posts={posts} setPosts={setPosts}/>
            </div>
        </div>
        </div>
    );
}
