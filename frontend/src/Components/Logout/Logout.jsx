import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

const LogoutPage = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch()

    useEffect(() => {

    ;(async () => {
        const response = await axios.post('/api/v1/users/logout')
        console.log(response.data)

        dispatch(logout())

            
        const timer = setTimeout(() => {
            
        navigate("/login");
        }, 3000);

        return () => clearTimeout(timer);
        
    })()
    
    }, [navigate]);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">You’ve been logged out</h1>
            <p className="text-gray-600 mb-6">
            Thanks for visiting Inkspire. We hope to see you again soon!
            </p>
            <div className="flex justify-center space-x-4">
            <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition"
            >
                Login Again
            </button>
            <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
                Go Home
            </button>
            </div>
            <p className="text-sm text-gray-400 mt-6">Redirecting to login in 3 seconds...</p>
        </div>
        </div>
    );
    };

export default LogoutPage;
