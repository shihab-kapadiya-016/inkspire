import { ArrowLeft, Key } from "lucide-react";
import { Link } from "react-router-dom";

export default function ChangePassword() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow p-6 space-y-4">
            <Link to="/dashboard" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>

            <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2">
            <Key className="w-5 h-5" /> Change Password
            </h2>

            <form className="space-y-4">
            <input
                type="password"
                placeholder="Current password"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="password"
                placeholder="New password"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
                Save Password
            </button>
            </form>
        </div>
        </div>
    );
}
