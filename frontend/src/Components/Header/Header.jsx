import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export function Header() {

    const isLoggedIn  = useSelector((state) => state.auth.isLoggedIn );
    const navigate = useNavigate()
    

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            {/* Logo / Title */}
            <Link to="/" className="text-2xl font-bold text-blue-600">
            Inkspire
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center space-x-6">
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition">
                About
            </Link>
            <Link to="/blogs" className="text-gray-600 hover:text-blue-600 transition">
                Blog
            </Link>
            <Link to="/explore" className="text-gray-600 hover:text-blue-600 transition">
                Explore
            </Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition">
                Dashboard
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition">
                Contact
            </Link>
            </nav>

            {/* Action Buttons */}
            {isLoggedIn ? (
            <button
                onClick={() => {
                navigate("/logout");
                }}
                className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50 cursor-pointer transition"
            >
                Logout
            </button>
            ) : (
            <div className="flex items-center space-x-3">
                <Link
                to="/login"
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition"
                >
                Login
                </Link>
                <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                Get Started
                </Link>
            </div>
            )}
        </div>
        </header>
    );
}
